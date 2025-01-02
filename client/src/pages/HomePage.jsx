import React from 'react'
import { UseAuthStore } from '../Store/UseAuthStore';
function HomePage() {
  const{logout}=UseAuthStore()
  return (
    <>
      <div>HomePage</div>
      <button onClick={logout}>logout</button>
    </>
  );
}

export default HomePage