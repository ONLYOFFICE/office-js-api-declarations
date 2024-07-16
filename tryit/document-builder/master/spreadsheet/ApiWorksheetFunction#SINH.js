builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SINH(4));
builder.SaveFile("xlsx", "SINH.xlsx");
builder.CloseFile();