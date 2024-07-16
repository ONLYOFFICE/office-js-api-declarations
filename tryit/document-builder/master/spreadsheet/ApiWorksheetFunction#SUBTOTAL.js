builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.SUBTOTAL(9, 10, 30, 50, 5));
builder.SaveFile("xlsx", "SUBTOTAL.xlsx");
builder.CloseFile();