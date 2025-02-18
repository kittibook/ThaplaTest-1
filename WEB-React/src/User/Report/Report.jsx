import React from "react";

class ComponentToPrint extends React.Component {
  render() {
    const { data, rankInClass, rankOverall } = this.props;
    return (
      <div>
        <style>
          {`
        @page {
            size: A4;
            margin: 1in;
        }
        @media print {
            body {
                width: 210mm;
                height: 297mm;
                -webkit-print-color-adjust: exact; /* For Safari/Chrome */
                color-adjust: exact; /* For Firefox */
            }
            img {
              -webkit-print-color-adjust: exact; /* For Chrome/Safari */
              print-color-adjust: exact;        /* For Firefox */
            }

        }
  `}
        </style>
        <div className="flex justify-center  mx-auto">
            <img style={{
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
  }} className="w-[200px] h-[250px]" src="https://apipic.bxoks.online/public/uploads/yWWzMGtWzbJHv96qpJOq2.jpg" alt="" />
            <img style={{
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact",
  }} className="w-[250px] h-[250px]" src="https://apipic.bxoks.online/public/uploads/3LH0k-CNw9-AR2aHTbhiT.jpg" alt="" />

            </div>
        <div className="p-8 font-sans ">
          <div className="flex flex-col justify-center text-center mt-5 font-bold">
            
            <h1 className="text-[18px] ">รายงานผลรายบุคคลฉบับนักเรียน</h1>
            <p className="text-[16px] ">
              โครงการทดสอบความรู้ตามมาตรฐานการเรียนรู้ Thapla Test
              ประจำปีการศึกษา 2567
            </p>
            <p className="text-[16px] ">
              สอบวันที่ 7 กุมภาพันธ์ พ.ศ.2568 ณ โรงเรียนท่าปลาประชาอุทิศ
            </p>
          </div>
          <div className="mt-10 text-[16px]">
            <h2 className="font-bold">ข้อมูลผู้เข้าสอบ</h2>
            <p>
              ชื่อ-สกุล {data ? data.fullname : ""} ชั้น{" "}
              {data ? data.class : ""}
            </p>
            <p>
              โรงเรียน{data ? data.school : ""} อำเภอ ท่าปลา จังหวัด อุตรดิตถ์
            </p>
          </div>
          <div className="mt-10 text-[16px]">
            <h2 className="font-bold">ผลการทดสอบ</h2>
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border bg-slate-200 border-black px-2 py-1">วิชา</th>
                  <th className="border bg-slate-200 border-black px-2 py-1">คะแนนที่ได้</th>
                  <th className="border bg-slate-200 border-black px-2 py-1">ร้อยละ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1">คณิตศาสตร์</td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Score?.find((score) => score.Class === "คณิตศาสตร์")
                      ?.Score || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {" "}
                    {(() => {
                      const scoreObject = data?.Score?.find(
                        (score) => score.Class === "คณิตศาสตร์"
                      );
                      if (scoreObject) {
                        const rawScore = parseFloat(scoreObject.Score); // แปลง Score (string) เป็น number
                        const percentage = ((rawScore * 100) / 30).toFixed(2); // คำนวณร้อยละ (สมมติคะแนนเต็ม 100)
                        return `${percentage}%`; // แสดงผลเป็น string เช่น "85%"
                      }
                      return ""; // กรณีไม่มีข้อมูล
                    })()}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">วิทยาศาสตร์</td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Score?.find((score) => score.Class === "วิทยาศาสตร์")
                      ?.Score || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {" "}
                    {(() => {
                      const scoreObject = data?.Score?.find(
                        (score) => score.Class === "วิทยาศาสตร์"
                      );
                      if (scoreObject) {
                        const rawScore = parseFloat(scoreObject.Score); // แปลง Score (string) เป็น number
                        const percentage = ((rawScore * 100) / 30).toFixed(2); // คำนวณร้อยละ (สมมติคะแนนเต็ม 100)
                        return `${percentage}%`; // แสดงผลเป็น string เช่น "85%"
                      }
                      return ""; // กรณีไม่มีข้อมูล
                    })()}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">
                    ภาษาและวัฒนธรรม
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Score?.find(
                      (score) => score.Class === "ภาษาและวัฒนธรรม"
                    )?.Score || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {" "}
                    {(() => {
                      const scoreObject = data?.Score?.find(
                        (score) => score.Class === "ภาษาและวัฒนธรรม"
                      );
                      if (scoreObject) {
                        const rawScore = parseFloat(scoreObject.Score); // แปลง Score (string) เป็น number
                        const percentage = ((rawScore * 100) / 40).toFixed(2); // คำนวณร้อยละ (สมมติคะแนนเต็ม 100)
                        return `${percentage}%`; // แสดงผลเป็น string เช่น "85%"
                      }
                      return ""; // กรณีไม่มีข้อมูล
                    })()}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">รวม 3 วิชา</td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Score?.find((score) => score.Class === "รวม")
                      ?.Score || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {" "}
                    {(() => {
                      const subjects = [
                        "คณิตศาสตร์",
                        "วิทยาศาสตร์",
                        "ภาษาและวัฒนธรรม",
                      ];
                      const totalScore = subjects.reduce((sum, subject) => {
                        const score = parseFloat(
                          data?.Score?.find((item) => item.Class === subject)
                            ?.Score || 0
                        );
                        return sum + score;
                      }, 0);
                      const percentage = (
                        (totalScore / (30 + 30 + 40)) *
                        100
                      ).toFixed(2); // คำนวณร้อยละรวมจากคะแนนเต็มของทุกวิชา
                      return `${percentage}%`;
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-20 text-[16px]">
            <h2 className="font-bold">ผลการจัดอันดับ</h2>
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border bg-slate-200 border-black px-2 py-1">วิชา</th>
                  <th className="border bg-slate-200  border-black px-2 py-1">
                    ชั้นประถมศึกษาปีที่ {data ? data.class : ""}
                  </th>
                  <th className="border bg-slate-200 border-black px-2 py-1">
                    ชั้นประถมศึกษาปีที่ 5-6
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-2 py-1">คณิตศาสตร์</td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Number?.find(
                      (Number) => Number.Class === "คณิตศาสตร์"
                    )?.Number || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.NumberALL?.find(
                      (NumberALL) => NumberALL.Class === "คณิตศาสตร์"
                    )?.NumberALL || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">วิทยาศาสตร์</td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Number?.find(
                      (Number) => Number.Class === "วิทยาศาสตร์"
                    )?.Number || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.NumberALL?.find(
                      (NumberALL) => NumberALL.Class === "วิทยาศาสตร์"
                    )?.NumberALL || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">
                    ภาษาและวัฒนธรรม
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.Number?.find(
                      (Number) => Number.Class === "ภาษาและวัฒนธรรม"
                    )?.Number || ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {data?.NumberALL?.find(
                      (NumberALL) => NumberALL.Class === "ภาษาและวัฒนธรรม"
                    )?.NumberALL || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1">รวม 3 วิชา</td>
                  <td className="border text-center border-black px-2 py-1">
                    {rankInClass ? rankInClass : ""}
                  </td>
                  <td className="border text-center border-black px-2 py-1">
                    {rankOverall ? rankOverall : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center text-center mt-20 text-[16px]">
            <div>
            <img className="w-[100px] mx-auto" src="https://apipic.bxoks.online/public/uploads/yriVqcEKvvqLVTIuOBPkW.jpg" alt="" />
            <p>(นายกิตติศักดิ์  สินธุวงศานนท์)</p>
            <p>ผู้อำนวยการโรงเรียน</p>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

// Wrap with React.forwardRef
const ForwardedComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <ComponentToPrint {...props} />
  </div>
));

export default ForwardedComponentToPrint;
