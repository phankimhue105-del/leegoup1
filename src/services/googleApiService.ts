const API_URL = 'https://script.google.com/macros/s/AKfycbx4R-ZCIy8S25MYon22zVdmZri4-tJBk6NpwxXSIjwwTRwtr2geSAtJ2wsJty1bIpnVdQ/exec';

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

export async function loginUser(username: string, password: string): Promise<UserInfo> {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();

  console.log("Using Google Apps Script");
  console.log("No fallback");
  console.log("No mock database");

  console.log("========== LOGIN REQUEST ==========");
  console.log(`username: ${cleanUsername}`);
  console.log(`password: ${cleanPassword}`);

  let httpStatus: number = 0;
  let rawText: string = "";
  let apiResponse: any = null;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: "login",
        username: cleanUsername,
        password: cleanPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    httpStatus = response.status;
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    rawText = await response.text();
    console.log("========== RESPONSE ==========");
    console.log(`HTTP Status: ${httpStatus}`);
    console.log(`Raw Response: ${rawText}`);

    try {
      apiResponse = JSON.parse(rawText);
      console.log("Parsed JSON:", JSON.stringify(apiResponse, null, 2));
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      throw new Error("Failed to parse server response.");
    }
  } catch (networkError: any) {
    console.error("Network or execution failure:", networkError);
    throw new Error(networkError.message || "Failed to communicate with authentication server.");
  }

  if (!apiResponse) {
    throw new Error("Empty response from server.");
  }

  // Extract properties
  const successVal = apiResponse.success;
  const statusStr = apiResponse.status ? String(apiResponse.status).trim().toLowerCase() : "";
  const messageVal = apiResponse.message || "";
  const studentNameVal = apiResponse.studentName;
  const classNameVal = apiResponse.className;
  const expireDateVal = apiResponse.expireDate;

  console.log(`success: ${successVal}`);
  console.log(`status: ${statusStr}`);
  console.log(`message: ${messageVal}`);
  console.log(`studentName: ${studentNameVal}`);
  console.log(`className: ${classNameVal}`);

  // Validation checks
  if (successVal !== true) {
    throw new Error(messageVal || "Incorrect username or password.");
  }

  if (statusStr !== "active") {
    throw new Error("This account is inactive. Please contact your teacher.");
  }

  // Ensure required fields exist in the response
  if (studentNameVal === undefined || classNameVal === undefined || expireDateVal === undefined) {
    throw new Error("Invalid user record: missing required user information fields from Google Sheet.");
  }

  return {
    username: apiResponse.username || cleanUsername,
    studentName: studentNameVal,
    className: classNameVal,
    expireDate: expireDateVal,
    status: statusStr
  };
}

export async function getProgress(username: string): Promise<ProgressInfo> {
  const cleanUsername = username.trim();
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: "getProgress",
      username: cleanUsername
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data && data.success) {
    if (data.progress === undefined || data.stars === undefined || data.className === undefined) {
      throw new Error("Invalid progress record: missing required progress fields from Google Sheet.");
    }
    return {
      stars: Number(data.stars),
      progress: String(data.progress),
      className: String(data.className)
    };
  }

  throw new Error(data?.message || "Failed to load progress.");
}

export async function updateProgress(username: string, stars: number, progress: string): Promise<boolean> {
  try {
    const cleanUsername = username.trim();
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: "updateProgress",
        username: cleanUsername,
        stars,
        progress
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!(data && data.success);
  } catch (error) {
    console.error("Failed to update progress:", error);
    return false;
  }
}
