-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2024 at 06:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stdwork`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$10$HwXblY0XNF59Ke.WBhFt6OW2QLuPA.W2P/p4tE6JALJaoqapHJCou');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `stdid` char(9) NOT NULL,
  `stdname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`stdid`, `stdname`) VALUES
('621320901', 'วรวุฒิ ดาราพัฒน์'),
('621320902', 'นภัส แสงตระกูล'),
('621320903', 'วิรุฬห์ศักดิ์ ชัยรินทร์'),
('621320904', 'หัสดิน บ้านนาไพสิฐ'),
('621320906', 'พัชราวรรณ เกิดพันธ์'),
('621320907', 'จิรศักดิ์ สิงหบุตร'),
('621320910', 'มุธิตา พลภักดี'),
('621320911', 'อนันตพร อรุณฉาย'),
('621320912', 'นราวิชญ์ รอดวงษ์'),
('621320913', 'วิษณุ ป้องศรี'),
('631320701', 'อาราตี ใจแสน'),
('631320702', 'วชิรวิทย์ เอี่ยมสอาด'),
('631320703', 'ภัทราภรณ์ พันธ์ประเสริฐ'),
('631320707', 'อาทิตย์ สุราภา'),
('631320708', 'ชยุตม์ วงษ์สังข์'),
('641320701', 'นฤภร ภากรสว่างภาคิน'),
('641320702', 'ณิชกุล จิตสว่าง'),
('641320704', 'นพัฒน์ ฤทธิสุทธิ์'),
('641320705', 'ศราวุฒิ พึ่งพัฒน์'),
('641320706', 'ธนวรรณ บัวทอง'),
('641320707', 'ลภัสกรญ์ ใจงาม'),
('641320708', 'นาวิน รื่นรวย'),
('641320709', 'เมธาสิทธิ์ พิลึก'),
('641320710', 'อัครวินท์ นัยวิรัตน์'),
('641320711', 'สายฟ้า ศิริไพบูลย์'),
('641320712', 'ชนิศรา เจือจันทร์'),
('641320713', 'เบญจมาศ ฐิติไพศาล'),
('641320715', 'สิทธิกร ปินเตา'),
('641320716', 'ปิยะฉัตร อินจันทร์'),
('641320717', 'เรืองฤทธิ์ แซ่จิว'),
('641320720', 'วงกต เติมเพชร'),
('641320721', 'ณัฐพล สงพัด'),
('641320722', 'ศุภณัฐ นิธิกุล'),
('641320725', 'ธีรพัฒน์ ม้วนหนู'),
('641320726', 'นันท์นภัส มาน้อย'),
('641320727', 'พีรวัฒน์ เกตุสิระไชย'),
('641320728', 'พีรสิษฐ์ ชดเชย'),
('641320730', 'ศุภชัย นุชเจริญ'),
('651320701', 'เสฏฐวุฒิ ใจฟู'),
('651320702', 'พิชญะ ฉัตรกุล'),
('651320704', 'สัมฤทธิ์ นครพุ่ม'),
('651320709', 'อนุพงษ์ คำหล้า'),
('651320710', 'อรรถกร สังข์ศิริ'),
('651320716', 'สุธิรา ช่างประดิษฐ์'),
('651320718', 'ธัญลักษณ์ ฟองเทพ'),
('651320720', 'ปานทิพย์ พุตศรี');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_work`
--

CREATE TABLE `tbl_work` (
  `wid` int(11) NOT NULL,
  `wtid` int(11) NOT NULL,
  `wname` varchar(255) NOT NULL,
  `stdid` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_work`
--

INSERT INTO `tbl_work` (`wid`, `wtid`, `wname`, `stdid`) VALUES
(1, 1, 'imissher', '641320708'),
(2, 1, 'imissher', '641320708'),
(5, 11, '', '641320708'),
(6, 3, '', '641320708'),
(7, 2, '', '641320708'),
(8, 2, '', '641320701'),
(11, 6, '', '621320902'),
(13, 1, '', '621320903'),
(14, 1, 'imissher', '641320708'),
(15, 11, '', '621320901'),
(16, 1, '', '621320902');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_works`
--

CREATE TABLE `tbl_works` (
  `wid` int(11) NOT NULL,
  `stdid` char(9) NOT NULL,
  `typework` varchar(3) NOT NULL,
  `pathwork` varchar(50) NOT NULL,
  `statuswork` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_works`
--

INSERT INTO `tbl_works` (`wid`, `stdid`, `typework`, `pathwork`, `statuswork`) VALUES
(1, '641320708', 'PIC', '1615131c-b6a1-4fa1-8b08-21662f9a1ff6.jpg', 0),
(2, '641320708', 'PIC', '935cec62-c932-472c-8a97-2b6b7ee16c33.jpg', 0),
(5, '641320708', 'VDO', '93610099-34ad-4cd9-be59-84bed650d535.mp4', 0),
(6, '641320708', 'PIC', '6bbb7065-df78-4971-bbd3-49532b6a8050.jpg', 0),
(7, '641320708', 'PDF', '2b3b7de2-8c8d-4478-acae-e0f171c6fa75.pdf', 0),
(8, '641320701', 'PDF', '5ca8d03c-85bf-4c91-9e7f-4b5f8f1fe501.pdf', 0),
(11, '621320902', 'PIC', '88140694-6da3-4756-a137-474158e1d13a.jpg', 0),
(13, '621320903', 'PIC', '71dc6f3a-9e8e-4208-8ea1-826359de620f.jpg', 0),
(14, '641320708', 'PIC', 'd0aefa26-e6f0-4dd3-b396-b9752fb8f297.jpg', 0),
(15, '621320901', 'VDO', 'cd581108-5f5d-49a5-afa6-25d8044a5347.mp4', 0),
(16, '621320902', 'PIC', '74b5b36a-c520-473b-b45d-16437023876d.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_worktype`
--

CREATE TABLE `tbl_worktype` (
  `wtid` int(11) NOT NULL,
  `wtname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_worktype`
--

INSERT INTO `tbl_worktype` (`wtid`, `wtname`) VALUES
(1, 'โปสเตอร์'),
(2, 'สื่อสิ่งพิมพ์'),
(3, 'แผ่นพับ'),
(4, 'คลิปวีดีโอพี่สอนน้อง'),
(5, 'สติ๊กเกอร์ไลน์'),
(6, 'ประกวด PDPA'),
(7, '3D Model'),
(8, '3D Design'),
(9, 'Wire Frames'),
(10, 'วุฒิบัตรการฝึกอบรม'),
(11, 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`stdid`);

--
-- Indexes for table `tbl_work`
--
ALTER TABLE `tbl_work`
  ADD PRIMARY KEY (`wid`);

--
-- Indexes for table `tbl_works`
--
ALTER TABLE `tbl_works`
  ADD PRIMARY KEY (`wid`);

--
-- Indexes for table `tbl_worktype`
--
ALTER TABLE `tbl_worktype`
  ADD PRIMARY KEY (`wtid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
