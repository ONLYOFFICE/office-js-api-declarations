builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.FACTDOUBLE(123));
builder.SaveFile("xlsx", "FACTDOUBLE.xlsx");
builder.CloseFile();