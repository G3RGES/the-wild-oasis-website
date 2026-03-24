"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity");

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex ">
      <FilterButton
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        //    onClick={() => handleFilter("all")}
      >
        All cabins
      </FilterButton>
      <FilterButton
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        //    onClick={() => handleFilter("small")}
      >
        Small cabins
      </FilterButton>
      <FilterButton
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        //   onClick={() => handleFilter("medium")}
      >
        Medium cabins
      </FilterButton>
      <FilterButton
        filter="large"
        // handleFilter={() => handleFilter("large")}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Large cabins
      </FilterButton>
    </div>
  );
}

function FilterButton({
  onClick,
  children,
  activeFilter,
  filter,
  handleFilter,
}) {
  return (
    <button
      className={`${activeFilter === filter ? "bg-primary-100 text-primary-800" : ""} px-5 py-2 hover:bg-primary-700`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
