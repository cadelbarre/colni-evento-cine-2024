"use client";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import "../utils/i18n";

import { LeftSide, Form } from "./components";
import Language from "./components/languages";

export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const separatorId = useId();

  return (
    <main className="w-full flex">
      <LeftSide />

      <section
        className="flex-1 flex items-start justify-center h-screen overflow-y-auto"
        style={{
          background:
            "linear-gradient(360deg,rgba(51, 51, 51, 1) 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <div className="w-full max-w-lg space-y-8  text-gray-600 sm:px-0 pb-20">
          <section className="px-6">
            <div className="relative">
              <div aria-label="dragon" className="relative min-h-52" role="img">
                <img
                  aria-label="dragon"
                  src="/dragon.webp"
                  loading="lazy"
                  className="absolute bottom-0 mx-auto object-cover z-10"
                />

                <img
                  aria-label="titulo formulario"
                  src="/game-title.webp"
                  loading="lazy"
                  className="absolute bottom-0 mx-auto object-cover z-10"
                />
              </div>

              <article className="flex justify-between items-center h-full mt-3 mb-6">
                <div className="mt-5 space-y-1 relative z-20">
                  <h3 className="text-gray-50 text-3xl font-bold sm:text-4xl text-balance">
                    {t("title")}
                  </h3>
                  <p className="text-gray-300">{t("subtitle")}</p>
                </div>
              </article>
              <Language />
            </div>

            <div className="relative pt-6" id={`separador-${separatorId}`}>
              <span className="block w-full h-px bg-slate-600" />
            </div>
          </section>

          <Form />
        </div>
      </section>
    </main>
  );
}
