import Head from "next/head";
import React from "react";
import FormikTemplate from "../../../layouts/AddForm";
import Wrapper from "../../../layouts/wrapper";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export default function Add() {
  const router = useRouter();
  const { pathname } = router;
  const backPath = pathname.split("add")[0];
  const apiEndPoint = "sub3/bagB2";
  const add = async (val) => {
    try {
      // return console.log(val);
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${apiEndPoint}`,
        {
          ...val,
        }
      );
      router.push(backPath);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Upsss!",
        text: error.message,
      });
    }
  };

  const initialValues = {
    sumberPembiayaan: "",
    jumlahJudulPenelitian: {
      TS2: "",
      TS1: "",
      TS: "",
    },
  };

  return (
    <>
      <Head>
        <title>Add Substandar 3 - Bagian 3 A 5</title>
      </Head>
      <Wrapper>
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Form Substandar 3</h1>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Form Substandar 3 Bagian 3 A 5
              </h6>
            </div>
            <div className="card-body">
              <FormikTemplate
                apiEndPoint={apiEndPoint}
                initialValues={initialValues}
                field={[
                  {
                    title: "Sumber Pembiayaan",
                    name: "sumberPembiayaan",
                    type: "text",
                  },
                  {
                    title: "Jumlah Judul Penelitian",
                    name: "jumlahJudulPenelitian",
                    type: "text",
                    child: [
                      {
                        title: "TS-2",
                        name: "TS2",
                        type: "number",
                      },
                      {
                        title: "TS-1",
                        name: "TS1",
                        type: "number",
                      },
                      {
                        title: "TS",
                        name: "TS",
                        type: "number",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>

          {/* <!-- Content Row --> */}
        </div>
      </Wrapper>
    </>
  );
}
