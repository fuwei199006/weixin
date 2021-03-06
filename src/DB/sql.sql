USE [Member]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 2016/6/15 22:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MemberId] [nvarchar](20) NOT NULL,
	[MemberName] [nvarchar](50) NULL,
	[MemberPhone] [nvarchar](20) NOT NULL,
	[MemberEmail] [nvarchar](20) NOT NULL,
	[MemberLevel] [nvarchar](10) NULL,
	[CreateDate] [datetime] NULL,
	[MemberStatus] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Room]    Script Date: 2016/6/15 22:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Room](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RoomType] [nvarchar](10) NOT NULL,
	[RoomePrice] [nvarchar](50) NOT NULL,
	[RoomDesc] [nvarchar](500) NULL,
	[RoomData] [nvarchar](500) NULL DEFAULT (''),
	[CreateDate] [datetime] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SOrder]    Script Date: 2016/6/15 22:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SOrder](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OrderNum] [nvarchar](8) NOT NULL,
	[OrderStatus] [nvarchar](4) NULL,
	[CreateDate] [datetime] NULL,
	[OrderDate] [datetime] NULL,
	[MemberId] [nvarchar](20) NOT NULL,
	[MemberName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SOrderDetail]    Script Date: 2016/6/15 22:37:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SOrderDetail](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OrderDetailNum] [nvarchar](8) NOT NULL,
	[OrderDetailStatus] [nvarchar](4) NULL,
	[CreateDate] [datetime] NULL,
	[RoomId] [int] NULL,
	[RoomType] [nvarchar](10) NOT NULL,
	[RoomePrice] [nvarchar](50) NOT NULL,
	[RoomDesc] [nvarchar](500) NULL,
	[RoomData] [nvarchar](500) NULL,
	[MemberId] [nvarchar](20) NOT NULL,
	[MemberName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Member] ADD  DEFAULT ((0)) FOR [MemberLevel]
GO
ALTER TABLE [dbo].[Member] ADD  DEFAULT ((0)) FOR [MemberStatus]
GO
ALTER TABLE [dbo].[SOrder] ADD  DEFAULT ('1000') FOR [OrderStatus]
GO
ALTER TABLE [dbo].[SOrder] ADD  DEFAULT (getdate()) FOR [OrderDate]
GO
ALTER TABLE [dbo].[SOrderDetail] ADD  DEFAULT ('1000') FOR [OrderDetailStatus]
GO
ALTER TABLE [dbo].[SOrderDetail] ADD  DEFAULT ('') FOR [RoomData]
GO
ALTER TABLE [dbo].[SOrder]  WITH CHECK ADD CHECK  (([OrderStatus]='1003' OR [OrderStatus]='1002' OR [OrderStatus]='1001' OR [OrderStatus]='1000'))
GO
ALTER TABLE [dbo].[SOrderDetail]  WITH CHECK ADD CHECK  (([OrderDetailStatus]='1003' OR [OrderDetailStatus]='1002' OR [OrderDetailStatus]='1001' OR [OrderDetailStatus]='1000'))
GO




ALTER TABLE dbo.Member ADD Password NVARCHAR(100)

ALTER TABLE dbo.SOrderDetail ADD  OrderId INT NOT NULL