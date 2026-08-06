const API_URL = 'https://script.google.com/macros/s/AKfycbztxN9UxGUoAYilPnBrgIrba8wvplf8jNfgc4btDvu-d-GV3kodKWO1BFeWzNlfCMPtlg/exec';

export interface UserInfo {
  username: string;
  studentName: string;
  className: string;
  expireDate: string;
  status: string;
}

export interface ProgressInfo {
  stars: number;
  progress: string;
  className: string;
}

export class AuthError extends Error {
  url: string;
  requestBody: string;
  httpStatus: number;
  responseBody: string;
  parsedJson: any;
  originalError: string;

  constructor(message: string, details: {
    url: string;
    requestBody: string;
    httpStatus: number;
    responseBody: string;
    parsedJson: any;
    originalError: string;
  }) {
    super(message);
    this.name = "AuthError";
    this.url = details.url;
    this.requestBody = details.requestBody;
    this.httpStatus = details.httpStatus;
    this.responseBody = details.responseBody;
    this.parsedJson = details.parsedJson;
    this.originalError = details.originalError;
  }
}

export async function loginUser(username: string, password: string): Promise<UserInfo> {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();
  const payload = {
    action: "login",
    username: cleanUsername,
    password: cleanPassword
  };

  const requestBodyStr = JSON.stringify(payload);
  console.log("LOGIN REQUEST", requestBodyStr);

  let httpStatus = 0;
  let responseBodyStr = "";
  let parsedJson: any = null;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBodyStr
    });

    httpStatus = response.status;
    responseBodyStr = await response.text();
    console.log("LOGIN RESPONSE RAW", responseBodyStr);

    try {
      parsedJson = JSON.parse(responseBodyStr);
      console.log("LOGIN RESPONSE PARSED JSON", JSON.stringify(parsedJson));
    } catch (e: any) {
      throw new AuthError("Failed to parse server response.", {
        url: API_URL,
        requestBody: requestBodyStr,
        httpStatus,
        responseBody: responseBodyStr,
        parsedJson: null,
        originalError: e.message || String(e)
      });
    }

    if (!response.ok) {
      throw new AuthError("Server returned HTTP error status.", {
        url: API_URL,
        requestBody: requestBodyStr,
        httpStatus,
        responseBody: responseBodyStr,
        parsedJson,
        originalError: `HTTP status: ${response.status}`
      });
    }

    const status = parsedJson.status ? String(parsedJson.status).trim().toLowerCase() : "";
    const success = parsedJson.success === true;

    if (success && status === "active") {
      return {
        username: parsedJson.username || cleanUsername,
        studentName: parsedJson.studentName,
        className: parsedJson.className,
        expireDate: parsedJson.expireDate,
        status: parsedJson.status
      };
    }

    const message = parsedJson.message ? String(parsedJson.message) : "";
    let errMsg = "Incorrect username or password.";
    if (message.toLowerCase().includes("inactive") || status === "inactive") {
      errMsg = "This account is inactive. Please contact your teacher.";
    } else if (message) {
      errMsg = message;
    }

    throw new AuthError(errMsg, {
      url: API_URL,
      requestBody: requestBodyStr,
      httpStatus,
      responseBody: responseBodyStr,
      parsedJson,
      originalError: message || "Incorrect username or password."
    });

  } catch (err: any) {
    if (err instanceof AuthError) {
      throw err;
    }
    throw new AuthError(err.message || String(err), {
      url: API_URL,
      requestBody: requestBodyStr,
      httpStatus,
      responseBody: responseBodyStr,
      parsedJson,
      originalError: err.message || String(err)
    });
  }
}

export async function getProgress(username: string): Promise<ProgressInfo> {
  const payload = {
    action: "getProgress",
    username: username.trim()
  };

  console.log("GET PROGRESS REQUEST", JSON.stringify(payload));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("HTTP error: " + response.status);
  }

  const data = await response.json();
  console.log("GET PROGRESS RESPONSE", JSON.stringify(data));

  if (data && data.success === true) {
    return {
      stars: Number(data.stars) || 0,
      progress: String(data.progress || "0/32"),
      className: String(data.className || "")
    };
  }

  throw new Error(data?.message || "Failed to load progress.");
}

export async function updateProgress(username: string, stars: number, progress: string): Promise<boolean> {
  const payload = {
    action: "updateProgress",
    username: username.trim(),
    stars: stars,
    progress: progress
  };

  console.log("UPDATE PROGRESS REQUEST", JSON.stringify(payload));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    console.log("UPDATE PROGRESS RESPONSE", JSON.stringify(data));

    return !!(data && data.success === true);
  } catch (error) {
    console.error(error);
    return false;
  }
}
