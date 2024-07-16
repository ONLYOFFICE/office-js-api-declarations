builder.CreateFile("xlsx");

const oWorksheet = Api.GetActiveSheet();

var oFunction = Api.GetWorksheetFunction();
var ans = oFunction.ISOWEEKNUM("9/1/2017"); 

oWorksheet.GetRange("C1").SetValue(ans);

builder.SaveFile("xlsx", "ISOWEEKNUM.xlsx");
builder.CloseFile();