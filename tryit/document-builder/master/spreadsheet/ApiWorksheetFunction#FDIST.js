builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.FDIST(10, 6, 4);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "FDIST.xlsx");
builder.CloseFile();