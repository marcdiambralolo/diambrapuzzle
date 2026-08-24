"use client";
import { useBirthDate } from "@/hooks/cinqetoiles/useBirthDate";
import { useSlide4SectionDoors } from "@/hooks/cinqetoiles/useSlide4SectionDoors";
import { buildIsoDate, cx } from "@/lib/functions";
import { useCallback, useEffect } from "react";
import ActionButtons from "./components/ActionButtons";
import ApiErrorCard from "./components/ApiErrorCard";
import BirthDateInput from "./components/BirthDateInput";
import LocationAndGenderFields from "./components/LocationAndGenderFields";
import NameFields from "./components/NameFields";
import SecurityFields from "./components/SecurityFields";
import SecurityFooter from "./components/SecurityFooter";

export default function ProfilPageClientDoors() {
  const {
    handleChange, handleReset, handleSubmit,
    apiError, errors, form, countryOptions, submitClass, cancelClass,
  } = useSlide4SectionDoors();

  const {
    birthDay, birthMonth, birthYear,
    handleDayChange, handleMonthChange, handleYearChange,
  } = useBirthDate(form.dateNaissance);

  useEffect(() => {
    const isoDate = buildIsoDate(birthDay, birthMonth, birthYear);
    handleChange({
      target: {
        name: "dateNaissance",
        value: isoDate,
      },
    } as any);
  }, [birthDay, birthMonth, birthYear, handleChange]);

  const handleSecretCodeChange = useCallback(
    (code: string) => {
      handleChange({ target: { name: "secretCode", value: code } } as any);
    },
    [handleChange]
  );

  const handlePhoneChange = useCallback(
    (phone: string) => {
      handleChange({ target: { name: "phone", value: phone } } as any);
    },
    [handleChange]
  );

  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center text-center">
      <section
        className={cx(
          "w-full max-w-2xl px-3 py-4 sm:px-6 sm:py-6",
          "dark:bg-slate-950/55 dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
        )}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <SecurityFields
              secretCode={form.secretCode || ""}
              phone={form.phone || ""}
              onSecretCodeChange={handleSecretCodeChange}
              onPhoneChange={handlePhoneChange}
              errors={errors}
            />

            <NameFields
              nom={form.nom}
              prenoms={form.prenoms}
              onChange={handleChange}
              errors={errors}
            />

            <BirthDateInput
              day={birthDay}
              month={birthMonth}
              year={birthYear}
              onDayChange={handleDayChange}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              error={errors.dateNaissance}
            />

            <LocationAndGenderFields
              country={form.country}
              gender={form.gender ?? ""}
              onChange={handleChange}
              errors={errors}
              countryOptions={countryOptions}
            />

            {apiError && <ApiErrorCard apiError={apiError} />}

            <ActionButtons
              onSubmit={handleSubmit}
              onReset={handleReset}
              submitClass={submitClass}
              cancelClass={cancelClass}
            />
          </form>
        </div>

        <SecurityFooter />
      </section>
    </main>
  );
}