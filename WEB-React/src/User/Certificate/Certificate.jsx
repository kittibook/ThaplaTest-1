import React from "react";

class ComponentToPrintCertificate extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <style>
          {`
            @page {
              size: 297mm 210mm; /* A4 แนวนอน */
              margin: 0; /* ไม่มีขอบกระดาษ */
            }
            @media print {
              body {
                margin: 0;
                -webkit-print-color-adjust: exact; /* Chrome/Safari */
                print-color-adjust: exact; /* Firefox */
              }
              img {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          `}
        </style>
        {/* Wrapper ที่ใช้ขนาดพอดี A4 แนวนอน */}
        <div className="w-[1123px] h-[794px] flex justify-center items-center mx-auto bg-white">
          {/* ตั้งค่าพื้นหลัง */}
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://apipic.bxoks.online/public/uploads/2HKYl51xVSCYATq25ws49.png')",
            }}
          >
            {/* ชื่อที่อยู่ตรงกลางของใบประกาศ */}
            <div className="absolute top-[-2%] left-0 w-full h-full flex justify-center items-center">
              <h1 className="text-4xl text-black">
                {data ? data.fullname : ""}
              </h1>
            </div>
            <div className=" w-full h-full flex justify-center items-center">
              <h1 className="text-xl text-black absolute top-[60.5%] left-[59%]">
                {data
                  ? data.level === "1"
                    ? "เพชร"
                    : data.level === "2"
                    ? "ทอง"
                    : data.level === "3"
                    ? "เงิน"
                    : data.level === "4"
                    ? "ทองแดง"
                    : data.level === "5" 
                    ? "เข้าร่วม"
                    : ""
                  : ""}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap with React.forwardRef for easy printing
const CertificateComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <ComponentToPrintCertificate {...props} />
  </div>
));

export default CertificateComponentToPrint;
