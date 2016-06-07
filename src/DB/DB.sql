USE Member
GO


CREATE TABLE Member (
 ID INT PRIMARY KEY IDENTITY,
 MemberId nvarchar(20) NOT NULL,
 MemberName nvarchar(50),
 MemberPhone nvarchar(20) NOT NULL ,
 MemberEmail nvarchar(20) NOT NULL ,
 MemberLevel  nvarchar(10) DEFAULT 0,
 CreateDate datetime,
 MemberStatus nvarchar(10) DEFAULT 0
 )

 CREATE TABLE Room(
 ID INT PRIMARY KEY IDENTITY,
 RoomType NVARCHAR(10) NOT NULL,
 RoomePrice NVARCHAR(50) NOT NULL,
 RoomDesc NVARCHAR(500),
 RoomData NVARCHAR(500) DEFAULT '',
 CreateDate DATETIME,
 StartDate DATETIME,
 EndDate DATETIME
)


CREATE TABLE SOrder(
ID INT IDENTITY PRIMARY KEY,
OrderNum NVARCHAR(8) NOT NULL,
OrderStatus NVARCHAR(4) CHECK (OrderStatus IN ('1000','1001','1002','1003')) DEFAULT '1000',
CreateDate DATETIME,
OrderDate DATETIME DEFAULT GETDATE(),
 MemberId nvarchar(20) NOT NULL,
  MemberName nvarchar(50),
)

CREATE TABLE SOrderDetail(
ID INT IDENTITY PRIMARY KEY,
OrderDetailNum NVARCHAR(8) NOT NULL,
OrderDetailStatus NVARCHAR(4) CHECK (OrderDetailStatus IN ('1000','1001','1002','1003')) DEFAULT '1000',
CreateDate DATETIME,
RoomId INT,
RoomType NVARCHAR(10) NOT NULL,
RoomePrice NVARCHAR(50) NOT NULL,
RoomDesc NVARCHAR(500),
RoomData NVARCHAR(500) DEFAULT '',
MemberId nvarchar(20) NOT NULL,
MemberName nvarchar(50)
)