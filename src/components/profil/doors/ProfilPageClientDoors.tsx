"use client";
import { useBirthDate } from "@/hooks/cinqetoiles/useBirthDate";
import { useFormHandlers } from "@/hooks/cinqetoiles/useFormHandlers";
import { useSlide4SectionDoors } from "@/hooks/cinqetoiles/useSlide4SectionDoors";
import { buildIsoDate } from "@/lib/functions";
import { useEffect } from "react";
import ActionButtons from "./components/ActionButtons";
import ApiErrorCard from "./components/ApiErrorCard";
import BirthDateInput from "./components/BirthDateInput";
import FormContainer from "./components/FormContainer";
import LocationAndGenderFields from "./components/LocationAndGenderFields";
import NameFields from "./components/NameFields";
import SectionContainer from "./components/SectionContainer";
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

  const { handleSecretCodeChange, handlePhoneChange } = useFormHandlers(handleChange);

  useEffect(() => {
    const isoDate = buildIsoDate(birthDay, birthMonth, birthYear);
    handleChange({
      target: {
        name: "dateNaissance",
        value: isoDate,
      },
    } as any);
  }, [birthDay, birthMonth, birthYear, handleChange]);

  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center text-center">
      <SectionContainer>
        <FormContainer onSubmit={handleSubmit}>

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
        </FormContainer>

        <SecurityFooter />
      </SectionContainer>
    </main>
  );
}