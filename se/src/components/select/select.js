import React, { useState } from 'react';  
import {Space} from 'antd'

function UserCategorySelector(props) {
  const [selectedCategory, setSelectedCategory] = useState('');  
  
  const handleCategoryChange = (event) => {  
    setSelectedCategory(event.target.value);  
    props.onCategoryChange(event.target.value);
  };
  
  return (  
    <div>  
      <Space style={{ width: '100',fontSize:'3vh'} }  >
        <span>用户类别</span>
        <select value={selectedCategory} 
        style={{fontSize:'3vh', height: '4vh'}} 
        onChange={handleCategoryChange}>
          <option value="student">学生</option>  
          <option value="teacher">教师</option>  
          <option value="admin">管理员</option>  
        </select>  
      </Space>
    </div>
  );  
}  
  
export default UserCategorySelector;