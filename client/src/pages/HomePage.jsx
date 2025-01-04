import React from 'react'
import { UseAuthStore } from '../Store/UseAuthStore';
function HomePage() {
  const{logout}=UseAuthStore()
  return (
    <div>
      <div>HomePage</div>
      <button onClick={logout}>logout</button>
      <h1>hello homepage</h1>
    </div>
  );
}

export default HomePage