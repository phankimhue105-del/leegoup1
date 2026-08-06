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

export async function loginUser(username: string, password: string): Promise<UserInfo> {
  const payload = {
    action: "login",
    username: username.trim(),
    password: password.trim()
  };

  console.log("LOGIN REQUEST", JSON.stringify(payload));

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
  console.log("LOGIN RESPONSE", JSON.stringify(data));

  const status = data.status ? String(data.status).trim().toLowerCase() : "";
  const success = data.success === true;

  if (success && status === "active") {
    return {
      username: data.username || username.trim(),
      studentName: data.studentName,
      className: data.className,
      expireDate: data.expireDate,
      status: data.status
    };
  }

  const message = data.message ? String(data.message).toLowerCase() : "";
  if (message.includes("inactive") || status === "inactive") {
    throw new Error("This account is inactive. Please contact your teacher.");
  }
  
  throw new Error("Incorrect username or password.");
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
