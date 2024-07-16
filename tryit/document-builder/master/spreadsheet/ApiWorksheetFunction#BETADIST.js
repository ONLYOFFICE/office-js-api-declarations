builder.CreateFile("xlsx");
var oWorksheet = Api.GetActiveSheet();
var oFunction = Api.GetWorksheetFunction();
var avg = oFunction.BETADIST(0.4, 4, 5);
oWorksheet.GetRange("B2").SetValue(avg);
builder.SaveFile("xlsx", "BETADIST.xlsx");
builder.CloseFile();