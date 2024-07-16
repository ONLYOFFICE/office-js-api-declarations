builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
oWorksheet.GetRange("A1").SetValue(oFunction.BITLSHIFT(4, 2));
builder.SaveFile("xlsx", "BITLSHIFT.xlsx");
builder.CloseFile();