/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Topbar({ setTag }) {
  return (
    <div className="flex items-center justify-between mb-12">
      <h4 className="mt-2 text-xl font-bold">Book List</h4>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setTag("All")}
          className="lws-filter-btn active-filter"
        >
          All
        </button>
        <button onClick={() => setTag("Featured")} className="lws-filter-btn">
          Featured
        </button>
      </div>
    </div>
  );
}
