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
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();
  const payload = {
    action: "login",
    username: cleanUsername,
    password: cleanPassword
  };

  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
  }

  const responseBodyStr = await response.text();
  let parsedJson: any = null;

  try {
    parsedJson = JSON.parse(responseBodyStr);
  } catch (e) {
    throw new Error("Sai cấu trúc dữ liệu phản hồi từ máy chủ.");
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
  if (message.toLowerCase().includes("inactive") || status === "inactive") {
    throw new Error("Tài khoản chưa được kích hoạt. Vui lòng liên hệ giáo viên.");
  }
  
  throw new Error("Sai tên đăng nhập hoặc mật khẩu.");
}

export async function getProgress(username: string): Promise<ProgressInfo> {
  const payload = {
    action: "getProgress",
    username: username.trim()
  };

  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Không thể tải thông tin tiến trình từ máy chủ.");
  }

  const data = await response.json();

  if (data && data.success === true) {
    return {
      stars: Number(data.stars) || 0,
      progress: String(data.progress || "0/32"),
      className: String(data.className || "")
    };
  }

  throw new Error(data?.message || "Không thể tải thông tin tiến trình.");
}

export async function updateProgress(username: string, stars: number, progress: string): Promise<boolean> {
  const payload = {
    action: "updateProgress",
    username: username.trim(),
    stars: stars,
    progress: progress
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!(data && data.success === true);
  } catch (error) {
    console.error(error);
    return false;
  }
}
