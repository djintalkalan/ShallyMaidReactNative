-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2019 at 09:29 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shally_maid_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(11) NOT NULL,
  `service_id` text NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `img` text NOT NULL,
  `addedon` text NOT NULL,
  `updatedon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `service_id`, `name`, `description`, `img`, `addedon`, `updatedon`) VALUES
(1, '', 'Flat', '', '', '', ''),
(2, '', 'Home', '', '', '', ''),
(3, '', 'PG', '', '', '', ''),
(4, '', 'Restaurant', '', '', '', ''),
(5, '', 'Wax', '', '', '', ''),
(6, '', 'Mehndi', '', '', '', ''),
(7, '', 'Makeup', '', '', '', ''),
(8, '', 'Electrician', '', '', '', ''),
(9, '', 'Plumber', '', '', '', ''),
(10, '', 'Carpenter', '', '', '', ''),
(11, '', 'Office', '', '', '', ''),
(12, '', 'Party Hall', '', '', '', ''),
(13, '', 'Mess', '', '', '', ''),
(14, '', 'School', '', '', '', ''),
(15, '', 'Other', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

CREATE TABLE `tbl_customer` (
  `id` int(11) NOT NULL,
  `cust_name` text NOT NULL,
  `cust_age` text NOT NULL,
  `cust_img` text NOT NULL,
  `cust_phone` text NOT NULL,
  `cust_password` text NOT NULL,
  `cust_status` text NOT NULL,
  `addedon` text NOT NULL,
  `updatedon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`id`, `cust_name`, `cust_age`, `cust_img`, `cust_phone`, `cust_password`, `cust_status`, `addedon`, `updatedon`) VALUES
(1, 'Deepak Jaglan', '', '', '9588558818', '123456', '1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` int(11) NOT NULL,
  `order_number` text NOT NULL,
  `customer_id` text NOT NULL,
  `service_id` text NOT NULL,
  `category_id` text NOT NULL,
  `subcategory_id` text NOT NULL,
  `req_type` text NOT NULL,
  `booking_date` text NOT NULL,
  `family_member` text NOT NULL,
  `address` text NOT NULL,
  `alternate_number` text NOT NULL,
  `status` text NOT NULL,
  `addedon` text NOT NULL,
  `updatedon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `order_number`, `customer_id`, `service_id`, `category_id`, `subcategory_id`, `req_type`, `booking_date`, `family_member`, `address`, `alternate_number`, `status`, `addedon`, `updatedon`) VALUES
(8, '15684923755', '1', '2', '4', '', 'daily', '', '', 'Figyu', '5569844563', '1', '1568492375', '1568492375'),
(9, '15685318895', '1', '1', '1', '3', 'occassionally', '17-Sep-2019', '', 'Jind', '8529572612', '1', '1568531889', '1568531889'),
(10, '15685321713', '1', '4', '15', '', 'occassionally', '16-Sep-2019', '', 'Fghjgcxcgb ', '5668809658', '1', '1568532171', '1568532171'),
(11, '15685321883', '1', '3', '7', '', 'daily', '', '', 'Gjijhgfdd', '2236871428', '1', '1568532188', '1568532188'),
(12, '15685322035', '1', '3', '5', '', 'daily', '', '', 'Vjkgsfgiigd', '4536874336', '1', '1568532203', '1568532203'),
(13, '15685322190', '1', '1', '15', '', 'occassionally', '16-Sep-2019', '', 'Dujczsthh', '5360712888', '1', '1568532219', '1568532219'),
(14, '15685322392', '1', '2', '2', '', 'daily', '', '12', 'Dhhbvzdyu', '5636885690', '1', '1568532239', '1568532239'),
(15, '15685325090', '1', '3', '6', '', 'daily', '', '', 'Rfh', '8924866951', '1', '1568532509', '1568532509'),
(16, '15685325215', '1', '5', '15', '', 'daily', '', '', 'Xvhj', '5566998556', '1', '1568532521', '1568532521');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `img` text NOT NULL,
  `cat_list` text NOT NULL,
  `addedon` text NOT NULL,
  `updatedon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `name`, `description`, `img`, `cat_list`, `addedon`, `updatedon`) VALUES
(1, 'Home Maids', 'Floor|Kitchen|Flat', '', '1,15', '', ''),
(2, 'Cook', 'Family|PG|Restaurent', '', '2,3,4,15', '', ''),
(3, 'Beauty, Mehndi, Makeup', 'Wax|Facial|Hair', '', '5,6,7,15', '', ''),
(4, 'Electrician, Plumber, Carpenter', 'Repair|Installation', '', '15', '', ''),
(5, 'Pantry Boy', 'Office|Kitchen|Mess', '', '15', '', ''),
(6, 'Gardner', 'Garden|Daily|SingleDay', '', '15', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcategory`
--

CREATE TABLE `tbl_subcategory` (
  `id` int(11) NOT NULL,
  `service_id` text NOT NULL,
  `category_id` text NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `img` text NOT NULL,
  `addedon` text NOT NULL,
  `updatedon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subcategory`
--

INSERT INTO `tbl_subcategory` (`id`, `service_id`, `category_id`, `name`, `description`, `img`, `addedon`, `updatedon`) VALUES
(1, '', '1', 'One BHK', '', '', '', ''),
(2, '', '1', 'Two BHK', '', '', '', ''),
(3, '', '1', 'Three BHK', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
