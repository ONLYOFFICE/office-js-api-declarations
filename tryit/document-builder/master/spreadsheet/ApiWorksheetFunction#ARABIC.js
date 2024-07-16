builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ARABIC("MCCL"));
builder.SaveFile("xlsx", "ARABIC.xlsx");
builder.CloseFile();