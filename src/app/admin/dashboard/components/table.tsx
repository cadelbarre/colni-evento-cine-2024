import { useRef, useState } from "react";
import debounce from "just-debounce";
import DataTable, { TableColumn } from "react-data-table-component";

import type { KeyedMutator } from "swr";
import type { ChangeEvent } from "react";
import type { UserData } from "@/types/user";

import Badge from "@/app/components/badge";
import Actions from "./actions";

export default function Table({
  data,
  mutate,
}: {
  data: UserData[];
  mutate: KeyedMutator<UserData[]>;
}): JSX.Element {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [filtered, setFiltered] = useState<UserData[] | null>(null);

  const filteredData = debounce((e: ChangeEvent<HTMLInputElement>): void => {
    const targetValue = e.target.value;

    /** Si el valor es vacio es porque se limpio el input */
    if (targetValue === "") {
      setFiltered(null);
      return;
    }

    /** Filtramos teniendo en cuenta el valor de cada columna */
    const filteredData = data.filter((doctor) => {
      const { id, name, email, cellphone, country, specialty, allergies } =
        doctor;
      const search = `${id} ${name} ${email} ${cellphone} ${country} ${specialty} ${allergies ?? ""}`;
      return search.toLowerCase().includes(targetValue.toLowerCase());
    });

    setFiltered(filteredData);
  }, 500);

  const filteredDataCheckBox = debounce((): void => {
    const targetValue = checkboxRef.current?.checked;

    if (!targetValue) {
      setFiltered(null);
      return;
    }

    /** Filtramos teniendo en cuenta el valor de cada columna */
    const filteredData = data.filter(
      (doctor) => doctor.payment === targetValue,
    );

    setFiltered(filteredData);
  }, 500);

  const columns: TableColumn<UserData>[] = [
    {
      name: "N°",
      selector: (_row, index) => (index ?? 0) + 1,
      width: "50px",
    },
    {
      name: "Cédula",
      selector: (row) => row.nit,
      wrap: true,
      sortable: true,
    },
    {
      name: "Nombre Completo",
      selector: (row) => row.name,
      wrap: true,
      sortable: true,
      width: "150px",
    },
    {
      name: "Especialidad",
      selector: (row) => row.specialty,
      wrap: true,
      width: "130px",
    },
    {
      name: "País",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Celular",
      selector: (row) => row.cellphone,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      width: "120px",
    },
    {
      name: "Alergias",
      selector: (row) => row.allergies ?? "",
      wrap: true,
      width: "90px",
    },
    {
      name: "Pagos",
      cell: (row) => <Badge payment={row.payment} />,
      width: "125px",
    },
    {
      name: "Acciones",
      cell: (row) => <Actions user={row} mutate={mutate} />,
      width: "125px",
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between">
        <div className="flex items-center space-x-6">
          <label className="flex flex-col">
            Buscador
            <input
              type="search"
              name="search"
              id="search"
              onChange={filteredData}
              className="max-w-md mt-2 px-3 py-2 text-gray-700  border border-gray-400 focus:border-indigo-600 shadow-sm rounded-lg bg-gray-50/30 disabled:bg-gray-100 disabled:cursor-wait"
            />
          </label>

          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-x-1">
              <input
                ref={checkboxRef}
                type="checkbox"
                name="role"
                onClick={filteredDataCheckBox}
                id="admin"
                className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150"
              />
              <label
                htmlFor="admin"
                className="text-sm text-gray-700 font-medium"
              >
                Mostrar solo pagados
              </label>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mt-4 md:mt-0">
            Total de registros: {data.length}
          </p>
        </div>
      </div>

      <section className="py-5 md:py-8 lg:py-10">
        <DataTable
          columns={columns}
          data={filtered ?? data}
          pagination
          highlightOnHover
          striped
          responsive
          defaultSortFieldId={1}
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#1e40af", // bg-blue-800
                color: "white",
                fontWeight: "600",
                height: "50px",
                fontSize: "13px",
                padding: "0.9rem",
              },
            },
            rows: {
              style: {
                "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" }, // gray-50
                paddingBlock: "0.9em",
                paddingInline: "0.8rem",
                fontSize: "13px",
              },
              highlightOnHoverStyle: {
                backgroundColor: "#eff6ff", // blue-50
              },
            },
          }}
        />
      </section>

      {/*<div className="mt-6 md:mt-10 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-blue-800 text-white font-medium border-b">
            <tr>
              <th className="py-3 px-4">N°</th>
              <th className="py-3 px-4">Cedula</th>
              <th className="py-3 px-4">Nombre Completo</th>
              <th className="py-3 px-4">Especialidad</th>
              <th className="py-3 px-4">Pais</th>
              <th className="py-3 px-4">Celular</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Alergias</th>
              <th className="py-3 px-4">Pagos</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y overflow-auto-y-auto overflow-x-auto">
            {(filtered ?? data).map((item, idx) => (
              <tr
                key={item.nit}
                className="odd:bg-gray-50 hover:bg-blue-50 [&>td]:p-2"
              >
                <td className=" whitespace-nowrap ">
                  <p className="text-center">{idx + 1}</p>
                </td>
                <td className=" whitespace-nowrap max-w-[12ch] break-all">
                  {item.nit}
                </td>
                <td className="">
                  <p className="w-32 break-words">{item.name}</p>
                </td>
                <td className="">
                  <p className="max-w-28 break-words">{item.specialty}</p>
                </td>
                <td className=" whitespace-nowrap">{item.country}</td>
                <td className=" whitespace-nowrap">{item.cellphone}</td>
                <td className="">
                  <p className="max-w-36 break-words">{item.email}</p>
                </td>
                <td className=" whitespace-nowrap">{item.allergies}</td>
                <td className=" whitespace-nowrap">
                  <Badge payment={item.payment} />
                </td>
                <td className=" whitespace-nowrap">
                  <Actions user={item} mutate={mutate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>*/}
    </>
  );
}
