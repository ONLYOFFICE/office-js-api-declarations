builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.DEC2OCT(-100));
builder.SaveFile("xlsx", "DEC2OCT.xlsx");
builder.CloseFile();