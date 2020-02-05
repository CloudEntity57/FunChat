-- SELECT TOP (1000) [Email]
--       ,[FirstName]
--       ,[LastName]
--       ,[ID]
--   FROM [SMARTCLOSET].[dbo].[APPUSER]
declare @convid UNIQUEIDENTIFIER;
set @convid = NEWID();
insert into Conversation values(
    GETDATE(),
    'PM',
    @convid
);

insert into USER_CONVERSATION values(
    NEWID(),
    @convid,
    'ae744423-71b7-4c43-ba1a-23c96fc2c6cd'
)
insert into USER_CONVERSATION values(
    NEWID(),
    @convid,
    '189f3bc0-fc77-4268-bb32-e562bbf94140'
)
