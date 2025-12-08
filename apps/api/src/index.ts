import express from "express";
import { htmlToPdf } from "./utils";

const app = express();

app.get("/convert-html-to-pdf", async (req, res) => {


  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Herman Walton - Financial Analyst</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc;
        }
        .divider {
            border-top: 2px solid #000;
            margin: 1.5rem 0;
        }
        .section-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .company-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .skill-table {
            width: 100%;
            border-collapse: collapse;
        }
        .skill-table td {
            padding: 0.25rem 0;
            vertical-align: top;
        }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="max-w-4xl mx-auto bg-white shadow-md p-8">
        <!-- Header Section -->
        <header class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">HERMAN WALTON</h1>
            <h2 class="text-xl font-semibold text-gray-700 mb-4">FINANCIAL ANALYST</h2>
            <div class="text-gray-600 mb-4">
                <p>Market Street 12, New York, 1021, The USA | (412) 479-6342 | example@gmail.com</p>
            </div>
            <div class="divider"></div>
        </header>

        <!-- Main Content -->
        <main>
            <!-- Summary Section -->
            <section class="mb-8">
                <h2 class="section-title">SUMMARY</h2>
                <p class="text-gray-700 leading-relaxed">
                    Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments. Worked to reduce business expenses and develop logical and advantageous operating plan budgets. Experience creating quarterly accruals based on trends and forecasted expenses.
                </p>
            </section>

            <!-- Professional Experience -->
            <section class="mb-8">
                <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
                
                <!-- GEO Corp Experience -->
                <div class="mb-6">
                    <h3 class="company-title">Financial Analyst, GEO Corp.</h3>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Created budgets and ensured that labor and material costs were decreased by 15 percent.</li>
                        <li>Created financial reports on completed projects, indicating advantageous results.</li>
                        <li>Generated financial statements including cash flow charts and balance sheets.</li>
                        <li>Created analysis and performance reports for management teams to review.</li>
                        <li>Introduced and implemented a different type of software to enhance communication of different organization.</li>
                    </ul>
                </div>
                
                <!-- Sisco Enterprises Experience -->
                <div>
                    <h3 class="company-title">Financial Analyst, Sisco Enterprises</h3>
                    <ul class="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Provide reports, ad-hoc analysis, annual operations plan budgets, monthly cash forecasts, and revenue forecasts.</li>
                        <li>Analyzed supplier contracts and advised in negotiations bringing budgets down by 6%.</li>
                        <li>Created weekly labor finance reports and presented the results to management.</li>
                    </ul>
                </div>
            </section>

            <!-- Education Section -->
            <section class="mb-8">
                <h2 class="section-title">EDUCATION</h2>
                
                <table class="w-full mb-4">
                    <tbody>
                        <tr>
                            <td class="font-medium py-1">Diploma in Computer Engineering</td>
                            <td class="text-right py-1">Aug 2006 — Oct 2008</td>
                        </tr>
                        <tr>
                            <td class="text-gray-600 pb-2" colspan="2">University of Arizona</td>
                        </tr>
                        <tr>
                            <td class="text-gray-600 pb-4" colspan="2">Graduated with High Honors.</td>
                        </tr>
                    </tbody>
                </table>
                
                <div>
                    <p class="font-medium">Bachelor in Computer Engineering</p>
                    <p class="text-gray-600">University of Arizona</p>
                    <ul class="list-disc pl-5 text-gray-700 mt-1">
                        <li>Graduated with High Honors.</li>
                    </ul>
                </div>
            </section>

            <!-- Technical Skills -->
            <section class="mb-8">
                <h2 class="section-title">TECHNICAL SKILLS</h2>
                
                <table class="skill-table">
                    <tr>
                        <td class="font-medium">Solution Strategies</td>
                        <td class="font-medium">Analytical Thinker</td>
                        <td class="font-medium">Innovation</td>
                        <td class="font-medium">Agile Methodologies</td>
                    </tr>
                    <tr>
                        <td class="font-medium">Effective Team leader</td>
                        <td class="font-medium">Market Assessment</td>
                        <td class="font-medium">Collaboration</td>
                        <td class="font-medium">Creative Problem Solving</td>
                    </tr>
                    <tr>
                        <td class="font-medium">Customer-centric Selling</td>
                        <td class="font-medium">Trend Analysis</td>
                        <td class="font-medium">Source Control</td>
                        <td class="font-medium">Networking</td>
                    </tr>
                </table>
            </section>

            <!-- Additional Information -->
            <section>
                <h2 class="section-title">ADDITIONAL INFORMATION</h2>
                
                <div class="flex flex-col md:flex-row md:space-x-12">
                    <div class="mb-4 md:mb-0">
                        <p class="font-medium">Languages:</p>
                        <p class="text-gray-700">English, French</p>
                    </div>
                    
                    <div class="mb-4 md:mb-0">
                        <p class="font-medium">Certificates:</p>
                        <p class="text-gray-700">Financial Analyst License</p>
                    </div>
                    
                    <div>
                        <p class="font-medium">Awards/Activities:</p>
                        <p class="text-gray-700">Most Innovate Employer of the Year (2011), Overall Best Employee Division Two (2009)</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</body>
</html>`;

  // Convert HTML to PDF
  htmlToPdf(html, 'output.pdf');
  const pdf = await htmlToPdf(html, "output.pdf");
  res.json({ message: "PDF generated successfully" });
});

app.get("/", (req, res) => {
  res.json({ message: "TypeScript backend is running!" });
});

app.listen(4000, () => {
  console.log("API server running on http://localhost:4000");
});