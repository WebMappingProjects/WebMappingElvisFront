// components

import CardTable from "../../components/Cards/CardTable";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
          <CardTable color="light" />
        </div>
        <div className="w-full px-4 mb-12">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}
