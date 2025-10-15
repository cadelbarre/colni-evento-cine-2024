"use client";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

import { FieldValuesTypes, schemaForm } from "../model";
import InputText from "@/shared/input-text";

import { countries } from "@/data/countries";

const INITIAL_VALUES = {
  name: "",
  nit: "",
  email: "",
  cellphone: "",
  country: "",
  specialty: "",
  allergies: "",
};

export const sendEmail = async (body: FieldValuesTypes): Promise<void> => {
  const data = {
    service_id: "service_vjt65x6",
    template_id: "template_j77o7yp",
    user_id: "IF0IZ6pmHpB4Jw65s",
    template_params: {
      ...body,
      reply_to: "colegioneurointervencionismo@gmail.com",
      fecha: new Date().toLocaleString(),
    },
  };

  await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async () => {
    await swal(
      "Correo Enviado!",
      "Se ha enviado un correo con la confirmación de la inscripción al evento. Siga los pasos que se indican para completar el proceso.",
      "success",
    );
  });
};

export default function Form(): JSX.Element {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValuesTypes>({
    resolver: zodResolver(schemaForm),
    defaultValues: INITIAL_VALUES,
  });

  const contriesEs = useMemo(() => countries.map((c) => c.es_name), []);

  const onSubmit = async (data: FieldValuesTypes): Promise<void> => {
    window.document.body.style.cursor = "wait";
    const body = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    window.document.body.style.cursor = "wait";

    if (body.ok) {
      toast.success("Usuario registrado exitosamente");
      await sendEmail(data);
      reset();
      window.document.body.style.cursor = "default";
    } else {
      const json = await body?.json();
      toast.error(json.message);
      toast.error("Error al registrar el usuario");

      await swal("¡Error!", "¡El usuario ya esta registrado!", "error");
      window.document.body.style.cursor = "default";
    }
  };

  return (
    <fieldset disabled={isSubmitting} className="space-y-10 bg-cover px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        id="form-inscription"
      >
        <InputText
          label={t("fullName")}
          autoFocus
          name="name"
          control={control}
          error={errors.name}
        />
        <InputText
          label={t("identification")}
          name="nit"
          control={control}
          error={errors.nit}
        />
        <InputText
          label={t("email")}
          type="email"
          name="email"
          control={control}
          error={errors.email}
        />
        <InputText
          label={t("cellphone")}
          name="cellphone"
          control={control}
          error={errors.cellphone}
        />
        <InputText
          label={t("specialty")}
          name="specialty"
          control={control}
          error={errors.specialty}
        />
        <InputText
          label={t("country")}
          name="country"
          list="countries"
          control={control}
          error={errors.country}
        />

        <datalist id="countries">
          {contriesEs.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <InputText
          label={t("allergies")}
          placeholder={t("placeholderAllergies")}
          name="allergies"
          control={control}
          error={errors.allergies}
        />
      </form>

      <button
        className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-700 active:bg-orange-600 rounded-lg duration-150 disabled:bg-orange-800 disabled:cursor-not-allowed hover:-translate-y-1 translate-y-0 transform ease-in-out"
        form="form-inscription"
        type="submit"
      >
        {t("register")}
      </button>
    </fieldset>
  );
}
