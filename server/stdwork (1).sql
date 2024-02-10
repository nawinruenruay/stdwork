-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2024 at 12:35 PM
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
(1, 1, '', '621320901'),
(2, 1, '', '621320901'),
(3, 1, '', '621320901'),
(4, 1, '', '621320901'),
(5, 1, '', '621320902'),
(6, 4, '', '621320903'),
(9, 2, '', '621320901'),
(10, 11, '', '621320901'),
(11, 11, '', '621320901'),
(12, 11, '', '621320910');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_works`
--

CREATE TABLE `tbl_works` (
  `id` int(11) NOT NULL,
  `wid` int(11) NOT NULL,
  `stdid` char(9) NOT NULL,
  `typework` varchar(10) NOT NULL,
  `pathwork` varchar(50) NOT NULL,
  `statuswork` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_works`
--

INSERT INTO `tbl_works` (`id`, `wid`, `stdid`, `typework`, `pathwork`, `statuswork`) VALUES
(1, 1, '621320901', 'PIC', 'c5252c8c-0f8c-4d89-ba95-90ab8bd01a99.jpg', 0),
(2, 2, '621320901', 'PIC', '4bdf79a4-ba89-4800-a788-f809f78ecfb1.jpg', 0),
(3, 3, '621320901', 'PIC', '1c200d3d-6bd1-41ab-8b54-ed0bde2243a9.jpg', 0),
(4, 4, '621320901', 'PIC', 'd0068e7b-bf13-45d2-8fa9-5875c2a6a77c.jpg', 0),
(5, 5, '621320902', 'PIC', '79ae30e1-2e02-491f-b744-7cd6335603b8.jpg', 0),
(6, 6, '621320903', 'VDO', 'c5177f78-ebd4-4576-b9f0-01ffce453312.mp4', 0),
(7, 7, '621320901', 'PIC', '6394e041-4987-49a7-b96b-0eae6936ec4c.jpg', 0),
(8, 8, '621320901', 'PIC', 'c8287b5f-3642-4dd4-a87c-cf625bf706a8.jpg', 0),
(9, 9, '621320901', 'PDF', '40584e6b-206b-4261-b26e-f2ad0e58178d.pdf', 0),
(10, 10, '621320901', 'PIC', '193a5cd6-b4fe-4989-81de-34cbfe8312f8.png', 0),
(11, 11, '621320901', 'PIC', '2caf6fe4-f3c1-4e2c-8d0e-c6c788780b5b.jpg', 0),
(12, 12, '621320910', 'PIC', '023e9176-19b2-47d1-bee3-0ebd3b548472.jpg', 0);

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
  ADD PRIMARY KEY (`id`);

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
