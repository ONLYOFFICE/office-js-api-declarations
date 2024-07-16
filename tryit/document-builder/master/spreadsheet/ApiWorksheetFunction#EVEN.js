builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.EVEN(15.67));
builder.SaveFile("xlsx", "EVEN.xlsx");
builder.CloseFile();