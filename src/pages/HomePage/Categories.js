import React from "react";

const categories = [
  { id: 1, name: "Measles", percent: "36" },
  { id: 2, name: "Polio", percent: "13" },
  { id: 3, name: "Tetanus", percent: "22" },
  { id: 4, name: "Hepatitis", percent: "29" },
];
function Categories() {
  return (
    <div className="flex gap-3">
      {categories.map((item) => (
        <div
          key={item.id}
          className="h-16 w-56 rounded-md shadow-sm flex items-center bg-white overflow-hidden hover:bg-secondary hover:text-white hover:shadow-md transition-all duration-150 ease-out cursor-pointer group"
        >
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/89/09/immune-system-icon-in-cartoon-style-vector-30178909.jpg"
            alt=""
            className="h-full w-20 object-cover"
          />
          <div className="py-1 px-4 flex-1">
            <h4 className="leading-tight text-sm">{item.name}</h4>
            <h1 className="text-secondary group-hover:text-white font-bold text-xl font-primary">
              {item.percent}
              <span className="font-normal ml-1">%</span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
