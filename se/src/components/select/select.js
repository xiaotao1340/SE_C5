import React, { useState } from 'react';  
  
function UserCategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState('');  
  
  const handleCategoryChange = (event) => {  
    setSelectedCategory(event.target.value);  
  };
  
  return (  
    <div>  
      <label>  
        选择用户类别:  
        <select value={selectedCategory} onChange={handleCategoryChange}>  
          <option value="">请选择...</option>  
          <option value="student">学生</option>  
          <option value="teacher">教师</option>  
          <option value="admin">管理员</option>  
        </select>  
      </label>  
    </div>  
  );  
}  
  
export default UserCategorySelector;