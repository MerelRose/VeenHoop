import React from 'react';
import '../styles/App.css';

function Home() {
  return (
    <div className='absolute left-[40%] top-[30%]'>
      <form>
        <label for='email' className='text-lg font-Rubik'>School e-mail:</label><br/>
        <input type="text" id="email" name="email" placeholder='School e-mail' className='p-2 rounded-lg w-96 border-inherit bg-gradient-to-r from-stone-300 to-stone-200'></input>
        <br/><cite className='text-gray-300'>School e-mail</cite>
        <br/>
        <label for='wachtwoord' className='text-lg font-Rubik'>Wachtwoord:</label><br/>
        <input type="text" id="wachtwoord" name="wachtwoord" placeholder='Wachtwoord' className='p-2 rounded-lg w-96 border-inherit bg-gradient-to-r from-stone-300 to-stone-200'></input>
        <br/><cite className='text-gray-300'>Wachtwoord</cite>
      </form>
      <br/> 
        <button type="button" className="w-[185px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Student</button>
        <button type="button" className="w-[185px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Leraar</button>
      <br/>
        <button type="button" class="w-[185px] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Login</button>
      </div>
  );
}
  
export default Home;
