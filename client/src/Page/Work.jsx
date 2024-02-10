import {
  ActionIcon,
  Flex,
  Modal,
  Button,
  TextInput,
  ScrollArea,
  Select,
  FileInput,
  Image,
  Center,
} from "@mantine/core";
import {
  IconEdit,
  IconPlus,
  IconTrash,
  IconPdf,
  IconVideo,
  IconFilePlus,
  IconPhoto,
} from "@tabler/icons-react";
import { Carousel, useAnimationOffsetEffect } from "@mantine/carousel";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import carousel from "../cssModule/carousel.module.css";

function Work() {
  const [Table, setTable] = useState([]);
  const [Std, setStd] = useState([]);
  const [Wt, setWt] = useState([]);

  const [ModalEdit, setModalEdit] = useState(false);
  const [ModalAdd, setModalAdd] = useState(false);

  const [ViewIMG, setViewIMG] = useState(false);
  const [SelectIMG, setSelectIMG] = useState([]);
  const TRANSITION_DURATION = 200;
  const [Embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(Embla, TRANSITION_DURATION);

  const [ViewVDO, setViewVDO] = useState(false);
  const [SelectVDO, setSelectVDO] = useState("");

  const [ViewPDF, setViewPDF] = useState(false);
  const [SelectPDF, setSelectPDF] = useState("");

  const [Wtid, setWtid] = useState("");
  const [Wname, setWname] = useState("");
  const [Stdid, setStdid] = useState("");
  const [Tw, setTw] = useState("");
  const [File, setFile] = useState([]);
  // const [Video, setVideo] = useState("");
  // const [Link, setLink] = useState("");

  const column = [
    {
      label: "ประเภทผลงาน",
      field: "wtname",
    },
    {
      label: "ชื่อผลงาน",
      field: "wname",
    },
    {
      label: "รหัสนักศึกษา",
      field: "stdid",
    },
    {
      label: "ชื่อไฟล์",
      field: "pathwork",
    },
    {
      label: "ดูผลงาน",
      field: "view",
    },
    {
      label: "จัดการ",
      field: "manage",
    },
  ];

  const Fetch = () => {
    axios.get("http://localhost:9999/worklist").then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.length !== 0) {
        setTable({
          columns: column,
          rows: [
            ...data.map((i, key) => ({
              wtname: i.wtname,
              wname: i.wname,
              stdid: i.stdid,
              pathwork: i.pathwork,
              view: (
                <>
                  {i.typework === "PDF" ? (
                    <>
                      <ActionIcon
                        onClick={() => {
                          setViewPDF(true);
                          setSelectPDF(
                            data.filter(
                              (item) =>
                                item.stdid === i.stdid &&
                                item.wtid === i.wtid &&
                                item.typework === i.typework
                            )
                          );
                        }}
                      >
                        <IconPdf />
                      </ActionIcon>
                    </>
                  ) : i.typework === "VDO" ? (
                    <>
                      <ActionIcon
                        onClick={() => {
                          setViewVDO(true);
                          setSelectVDO(
                            data.filter(
                              (item) =>
                                item.stdid === i.stdid &&
                                item.wtid === i.wtid &&
                                item.typework === i.typework
                            )
                          );
                        }}
                      >
                        <IconVideo />
                      </ActionIcon>
                    </>
                  ) : (
                    <>
                      <ActionIcon
                        onClick={() => {
                          setViewIMG(true);
                          setSelectIMG(
                            data.filter(
                              (item) =>
                                item.stdid === i.stdid &&
                                item.wtid === i.wtid &&
                                item.typework === i.typework
                            )
                          );
                        }}
                      >
                        <IconPhoto />
                      </ActionIcon>
                    </>
                  )}
                </>
              ),
              manage: (
                <>
                  <Flex gap="xs" justify="center" align="center">
                    <ActionIcon
                      onClick={() => {
                        edit(i.stdid, i.typework, i.wtid);
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        handleDelete(i.wid);
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Flex>
                </>
              ),
            })),
          ],
        });
      }
    });
  };

  useEffect(() => {
    Fetch();
    getStu();
    getWt();
  }, []);

  const getStu = () => {
    axios.get("http://localhost:9999/studentlist").then((res) => {
      setStd(res.data);
    });
  };

  const getWt = () => {
    axios.get("http://localhost:9999/worktypelist").then((res) => {
      setWt(res.data);
    });
  };

  const handleAddWork = async () => {
    if (!Wtid || !Stdid) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "รหัสนักศึกษาและประเภทผลงาน",
      });
      return;
    }
    try {
      const count = File.length - 1;
      for (let i = 0; i <= count; i++) {
        const formData = new FormData();
        formData.append("wtid", Wtid);
        formData.append("stdid", Stdid);
        formData.append("wname", Wname);
        formData.append("typework", Tw);
        formData.append("file", File[i]);
        const res = await axios.post(
          "http://localhost:9999/workadd",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.statusText === "OK" && i === count) {
          Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setModalAdd(false);
            Fetch();
            setStdid("");
            setFile([]);
          });
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err,
      });
    }
  };

  const edit = (stdid, typework, wtid) => {
    axios
      .post("http://localhost:9999/workstd/", {
        stdid: stdid,
        typework: typework,
        wtid: wtid,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleDelete = (wid) => {
    Swal.fire({
      title: "คุณต้องการลบข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD3333",
      cancelButtonColor: "#000000",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:9999/workdel/${wid}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
            Fetch();
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถลบข้อมูลได้",
            });
          });
      }
    });
  };

  const [pv, setPv] = useState([]);

  // const HandleFile = (val) => {
  //   setPv([]);
  //   setFile(val);
  //   val.forEach((img) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPv((val) => [...val, reader.result]);
  //     };
  //     reader.readAsDataURL(img);
  //   });
  // };

  const HandleFile = (val) => {
    setPv([]);
    setFile(val);
    val.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("image")) {
          setPv((prevPv) => [...prevPv, { type: "image", url: reader.result }]);
        } else if (file.type.startsWith("video")) {
          setPv((prevPv) => [...prevPv, { type: "video", url: reader.result }]);
        } else if (file.type === "application/pdf") {
          const blobUrl = URL.createObjectURL(file);
          setPv((prevPv) => [...prevPv, { type: "pdf", url: blobUrl }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //////////////////////
  // const uploadImage = async () => {
  //   console.log(File);
  //   try {
  //     let i = 0;
  //     const uploadPromises = File.forEach((image, index) => {
  //       const formData = new FormData();
  //       return new Promise((resolve) => {
  //         formData.append("wtid", Wtid);
  //         formData.append("stdid", Stdid);
  //         formData.append("wname", Wname);
  //         formData.append("typework", Tw);
  //         formData.append("file", image);
  //         // console.log(image.File);
  //         axios
  //           .post("http://localhost:9999/workadd", formData, {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           })
  //           .then((res1) => {
  //             console.log(i); // setTimeout(() => {
  //             resolve({
  //               index,
  //               success: res1.statusText === "OK",
  //             });
  //             i++;
  //             // }, 2000);
  //           });
  //       });
  //     });

  //     const results = await Promise.all(uploadPromises);
  //     const allSuccessful = results.every((result) => result.success);

  //     if (allSuccessful === true) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: "Upload completed",
  //       }).then((resp) => {
  //         setModalAdd(false);
  //         Fetch();
  //         setStdid("");
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error during image upload:", error);
  //   }
  // };
  /////////////////////

  return (
    <>
      <div style={{ background: "#f0f2f8", padding: "28px" }}>
        <div
          style={{
            marginBottom: "15px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Flex direction={{ base: "column", sm: "row" }} justify="flex-end">
            <Button
              variant="filled"
              color="#3366FF"
              leftSection={<IconPlus />}
              style={{ fontSize: "0.8rem" }}
              onClick={() => {
                setPv([]);
                setFile([]);
                setModalAdd(true);
              }}
            >
              เพิ่มข้อมูลผลงาน
            </Button>
          </Flex>
        </div>
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <MDBDataTable
            bordered
            hover
            data={Table}
            noBottomColumns
            small
            noRecordsFoundLabel="ไม่พบข้อมูล"
            searchLabel="ค้นหา"
            // theadColor="white"
            // theadTextWhite
            // striped
            disableRetreatAfterSorting
          />
        </div>
        {/* เพิ่มข้อมูล */}
        <Modal
          opened={ModalAdd}
          onClose={() => {
            setModalAdd(false);
          }}
          title="เพิ่มข้อมูลผลงาน"
          scrollAreaComponent={ScrollArea.Autosize}
          size="50%"
          centered
        >
          <Select
            label="รหัสนักศึกษา"
            placeholder="เลือกรหัสนักศึกษา"
            data={Std.map((Std) => Std.stdid)}
            clearable
            name="stdid"
            onChange={(value) => setStdid(value)}
            checkIconPosition="right"
            searchable
            withAsterisk
          />
          <Select
            label="ชื่อประเภทผลงาน"
            placeholder="เลือกชื่อประเภทผลงาน"
            data={Wt.map((Wt) => Wt.wtname)}
            clearable
            name="wtid"
            checkIconPosition="right"
            searchable
            withAsterisk
            onChange={(value) => {
              const select = Wt.find((item) => item.wtname === value);
              if (select) {
                setWtid(select.wtid);
              }
            }}
          />
          <Select
            label="ผลงานประเภท"
            placeholder="ผลงานประเภทไหน ? VDO , PIC , PDF"
            data={["VDO", "PIC", "PDF"]}
            clearable
            name="typework"
            checkIconPosition="right"
            searchable
            withAsterisk
            onChange={(value) => setTw(value)}
          />
          <TextInput
            placeholder="กรอกชื่อผลงาน"
            label="ชื่อผลงาน"
            name="wname"
            onChange={(event) => setWname(event.target.value)}
          />
          <FileInput
            label="ไฟล์ผลงาน"
            multiple
            value={File}
            onChange={HandleFile}
            leftSection={<IconFilePlus />}
            placeholder="เลือกไฟล์"
            leftSectionPointerEvents="none"
            clearable
          />
          {Array.isArray(pv) && (
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Carousel w="100%" classNames={carousel}>
                {pv.map((item, index) => (
                  <Carousel.Slide key={index}>
                    {item.type === "image" && <Image src={item.url} h="100%" />}
                    {item.type === "video" && (
                      <video
                        src={item.url}
                        height={300}
                        width="100%"
                        controls
                      />
                    )}
                    {item.type === "pdf" && (
                      <iframe src={item.url} width="100%" height="500px" />
                    )}
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          )}
          {/* {Array.isArray(pv) && (
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Carousel w="100%" classNames={carousel}>
                {pv.map((i) => (
                  <Carousel.Slide>
                    <Image src={i} h="100%" />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          )} */}
          <Button fullWidth mt="md" color="#3366FF" onClick={handleAddWork}>
            บันทึกข้อมูล
          </Button>
        </Modal>
      </div>
      {/* ####### IMG ######## */}
      <Modal
        opened={ViewIMG}
        onClose={() => {
          setViewIMG(false);
          // setSelectIMG([]);
        }}
        transitionProps={{ duration: TRANSITION_DURATION }}
        title={`${SelectIMG[0]?.wtname} - ${SelectIMG[0]?.stdid} ${SelectIMG[0]?.stdname}`}
        scrollAreaComponent={ScrollArea.Autosize}
        size="auto"
        centered
      >
        <Carousel
          w={400}
          getEmblaApi={setEmbla}
          classNames={carousel}
          withIndicators
        >
          {SelectIMG.map((img, index) => (
            <Carousel.Slide key={index}>
              <Image
                src={`http://localhost:9999/pic/${img.pathwork}`}
                h="100%"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
      {/* ####### VDO ######## */}
      <Modal
        opened={ViewVDO}
        onClose={() => {
          setViewVDO(false);
          // setSelectVDO([]);
        }}
        title={`${SelectVDO[0]?.wtname} - ${SelectVDO[0]?.stdid} ${SelectVDO[0]?.stdname}`}
        scrollAreaComponent={ScrollArea.Autosize}
        size="auto"
        centered
      >
        <video
          src={`http://localhost:9999/vdo/${SelectVDO[0]?.pathwork}`}
          height={500}
          controls
        />
      </Modal>
      {/* ####### PDF ######## */}
      <Modal
        opened={ViewPDF}
        onClose={() => {
          setViewPDF(false);
          // setSelectVDO([]);
        }}
        title={`${SelectPDF[0]?.wtname} - ${SelectPDF[0]?.stdid} ${SelectPDF[0]?.stdname}`}
        scrollAreaComponent={ScrollArea.Autosize}
        size="auto"
        centered
      >
        <embed
          src={`http://localhost:9999/pdf/${SelectPDF[0]?.pathwork}`}
          width="700px"
          height="600px"
        />
      </Modal>
    </>
  );
}

export default Work;
