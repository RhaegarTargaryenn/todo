import React from "react";

function FilterButton(props) {
  return (
    
    <button
      type="button"
      className="mt-10  xl:ml-[300px] md:ml-[200px] md:flex-wrap "
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="flex justify-center items-center"> </span>   
      <span className="relative group">
  <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
    <span className="relative ">{props.name}</span>
  </span>
  
</span>




     
    </button>
  );
}

export default FilterButton;
