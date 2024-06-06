export let user_type , user_info;

//获取用户类型
export async function getUserType(user_id) {
    // console.log("here");
    const url = new URL('http://localhost:5000/api/user_info');
    url.searchParams.append('user_id', user_id);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      const userInfo = await response.json();
    //   console.log(userInfo);
      user_type = userInfo.identity;
    //   user_type = "student";
    } else {
      console.error('Error fetching user info:', response.statusText);
    }
}

//获取学生信息
export async function getStuInfo(user_id) {
    const url = new URL('http://localhost:5000/api/stu_info');
    url.searchParams.append('user_id', user_id);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      user_info = await response.json();
      console.log(user_info);
    //   user_type = _user_info.identity;
    } else {
      console.error('Error fetching user info:', response.statusText);
    }
}

//获取教师信息
export async function getTeaInfo(user_id) {
    const url = new URL('http://localhost:5000/api/tea_info');
    url.searchParams.append('user_id', user_id);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      const user_info = await response.json();
      console.log(user_info);
    } else {
      console.error('Error fetching user info:', response.statusText);
    }
}

// 根据不同用户类型获取信息，home.js中仅需调用它
export async function processUser(account) {
    try {
      await getUserType(account);
      if (user_type === "student") {
        getStuInfo(account);
      } else if (user_type === "teacher") {
        getTeaInfo(account);
      }
    } catch (error) {
      console.error("Error getting user type:", error);
    }
  }
