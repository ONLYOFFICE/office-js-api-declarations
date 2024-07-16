builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FACT(123));
builder.SaveFile("xlsx", "FACT.xlsx");
builder.CloseFile();