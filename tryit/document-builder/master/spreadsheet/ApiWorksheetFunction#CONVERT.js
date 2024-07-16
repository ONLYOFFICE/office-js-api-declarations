builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.CONVERT(2, "Ibm", "kg"));
builder.SaveFile("xlsx", "CONVERT.xlsx");
builder.CloseFile();