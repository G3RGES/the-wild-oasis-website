"use client";

function Filter() {
  return (
    <div className="border border-primary-800 flex ">
      <button className="px-5 py-2 hover:bg-primary-700">All cabins</button>
      <button className="px-5 py-2 hover:bg-primary-700">Small cabins</button>
      <button className="px-5 py-2 hover:bg-primary-700">Medium cabins</button>
      <button className="px-5 py-2 hover:bg-primary-700">Large cabins</button>
    </div>
  );
}

export default Filter;
