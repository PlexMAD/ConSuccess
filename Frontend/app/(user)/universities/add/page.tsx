"use client";

import { useState } from "react";

const AddUniversityPage = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, city });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md flex flex-col gap-4"
    >
      <h1 className="text-2xl font-semibold font-geist">Добавить университет</h1>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Название университета</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vilnius University"
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Город</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Выберите город</option>
          <option value="Vilnius">Vilnius</option>
          <option value="Kaunas">Kaunas</option>
          <option value="Šiauliai">Šiauliai</option>
          <option value="Klaipėda">Klaipėda</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
      >
        Добавить
      </button>
    </form>
  );
};

export default AddUniversityPage;
