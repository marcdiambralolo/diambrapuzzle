"use client";
import { useCitySearch } from "@/hooks/commons/useCitySearch";
import { CityItem } from "@/lib/interfaces";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import InputField from "../InputField";
import SearchIcon from "./components/SearchIcon";
import SuggestionsDropdown from "./components/SuggestionsDropdown";

export type CitySelectValue = {
  cityId?: string;
  cityName: string;
  countryName?: string;
  countryCode?: string;
};

interface CitySelectFieldProps {
  id: string;
  label: string;
  value: string;
  countryValue?: string;
  placeholder?: string;
  cityApiUrl: string;
  cityApiKey?: string;
  limit?: number;
  onChangeText: (nextValue: string) => void;
  onSelectCity: (selected: CitySelectValue) => void;
  error?: string;
  disabled?: boolean;
  fallbackCities?: Array<{ name: string; countryName?: string }>;
}

const MIN_QUERY_LENGTH = 2;

function CitySelectFieldBase({
  id,
  label,
  value,
  countryValue,
  placeholder = "Rechercher une ville…",
  cityApiUrl,
  cityApiKey,
  limit = 8,
  onChangeText,
  onSelectCity,
  error,
  disabled,
  fallbackCities = [],
}: CitySelectFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const query = value.trim();
  const hasQuery = query.length >= MIN_QUERY_LENGTH;

  const fallbackFiltered = useMemo(() => {
    if (!fallbackCities.length || !hasQuery) return [];
    const q = query.toLowerCase();
    return fallbackCities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, limit)
      .map((c, idx) => ({
        id: `fallback_${idx}_${c.name}`,
        name: c.name,
        countryName: c.countryName,
      }));
  }, [fallbackCities, hasQuery, limit, query]);

  const { items, loading, netError } = useCitySearch({
    open,
    query,
    countryValue,
    cityApiUrl,
    cityApiKey,
    limit,
    fallbackFiltered,
  });

  const showDropdown = open && (loading || netError || items.length > 0 || (hasQuery && items.length === 0));

  const pickCity = useCallback(
    (city: CityItem) => {
      onSelectCity({
        cityId: city.id,
        cityName: city.name,
        countryName: city.countryName,
        countryCode: city.countryCode,
      });
      setOpen(false);
    },
    [onSelectCity]
  );

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" && items.length === 1) {
        pickCity(items[0]);
      }
    },
    [items, pickCity]
  );

  return (
    <div ref={rootRef} className="w-full">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="relative">
          <InputField
            label={label}
            name={id}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChangeText(e?.target?.value ?? "");
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
          />
          <SearchIcon />
        </div>

        <SuggestionsDropdown
          show={showDropdown as boolean}
          loading={loading}
          netError={netError}
          items={items}
          query={query}
          onSelect={pickCity}
          limit={limit}
        />

        {error && (
          <div className="mx-auto mt-2 max-w-xl text-left text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export const CitySelectField = memo(CitySelectFieldBase);