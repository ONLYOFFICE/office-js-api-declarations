builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.ROUNDUP(3.456, 0));
builder.SaveFile("xlsx", "ROUNDUP.xlsx");
builder.CloseFile();