/**
 * Created by tyrion on 16-7-23.
 */
var Project = require('../models/Project');
var User = require('../models/Users').Users;
var demoData = function () {

    var new_user1 = new User({
        email : 'employee1@mail.com',
        password : '123456',
        name: 'Vi Zhong',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });

    var new_user2 = new User({
        email : 'employee2@mail.com',
        password : '123456',
        name: 'WeiWei Qiu',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });

    var new_user3 = new User({
        email : 'employee3@mail.com',
        password : '123456',
        name: 'Sylvia Snow',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });

    var new_user4 = new User({
        email : 'employee4@mail.com',
        password : '123456',
        name: 'Rita Mao',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });

    var new_user5 = new User({
        email : 'employee5@mail.com',
        password : '123456',
        name: 'Richard Zhuo',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });

    var new_user6 = new User({
        email : 'employee6@mail.com',
        password : '123456',
        name: 'Bob Shi',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 20000,
        balance: 20000,
        role: 'employee'
    });
    var admin = new User({
        email : 'admin1@mail.com',
        password : '123456',
        name: 'Admin1',
        accountAddr : "0xab338cc8d3212ccab203a992c228ec5d",
        createTime : new Date(),
        totalAssets: 0,
        role: 'admin'
    });
    new_user1.save();
    new_user2.save();
    new_user3.save();
    new_user4.save();
    new_user5.save();
    new_user6.save();
    admin.save();

    Project.findOne({title: "Electronic Trading System"}, function(err,result){
        if(!result){
            var proj1 = new Project({
                title: "Electronic Trading System",
                brief: "From the front office to the back office, our suite of electronic trading solutions for foreign exchange, cash and derivatives can help you maximize efficiency while reducing your trading costs.",
                description: "<p>FX Solutions</p>\r\n\r\n<p>With hyper-competitive foreign exchange markets, you need execution speed, access to liquidity and ways to manage risk. We offer two solutions to help you achieve these goals and streamline your operations</p>\r\n\r\n<p>Currenex offers high-performance technology and deep pools of liquidity for trade execution. You receive access to disclosed and undisclosed liquidity together on a single screen. And many significant market liquidity sources are connected to our venue, which means you&rsquo;re connected to a premium source for FX liquidity in the market.<br />\r\nFX Connect&reg; is a multi-counterparty trading system that simplifies and automates your trading process, and can help reduce your operational risk, improve execution practices and enhance efficiency.<br />\r\nFX Connect Trade Services&reg; offers an exception-based confirmation platform, with a single dashboard and consolidated view of your post-trade activities, including settlement-enriched SWIFT messaging to external parties. This solution, which is used by more than 65 worldwide banks and liquidity providers, helps you maintain your trading relationships while increasing transparency.<br />\r\n&nbsp;<br />\r\nWith seamless integration with your order management and accounting systems, you can manage complex blocks and net across currency pairs. And you&rsquo;ll choose from several execution styles to transact spot, deliverable forward and swap trades &mdash; across multiple accounts, with multiple counterparties.</p>\r\n\r\n<p>Our FX trading platforms give you interactive pricing, efficient workflows, and a reporting and auditing trail &mdash; to help you improve performance, lower costs and meet your clients&rsquo; needs.</p>\r\n\r\n<p>Liquidity Management</p>\r\n\r\n<p>With credit markets so uncertain, it&rsquo;s critical that you efficiently manage your short-term liquidity. Fund Connect&reg; helps you meet your investment goals, with convenient access to a wide range of global money market products through a single interface.</p>\r\n\r\n<p>To help you comply with your investment guidelines, Fund Connect offers an intuitive portfolio analytics and pre-trade compliance module. Combined with customizable risk analytics and reporting capabilities, Fund Connect is a comprehensive liquidity management solution for the cash investor. It provides the tools you need to help streamline and consolidate your daily investment and reporting &mdash; and the highest level of client service throughout these processes.</p>\r\n\r\n<p>ProjectTitle:<br />",
                comments: [{
                    time: new Date().toLocaleString(),
                    content: "What a good ideal!",
                    name:new_user1.name
                },{
                    time: new Date().toLocaleString(),
                    content: "Sounds great but still a loooot of works to do!!",
                    name:new_user2.name
                }],
                funders: [],
                image: '/images/projects/electronic-trading-software.jpg',
                createTime: new Date(),
                deadline: new Date(2016,9,10,12,0,0),
                targetAmount: 100000,
                raisedAmount: 0
            });
            var proj2 = new Project({
                title: "Trading Workflow Tools",
                brief: " Our trading workflow tools can help your traders make trades quickly and reliably, every time.",
                description: "<p>&nbsp; Swap Execution</p>\r\n\r\n<p>As derivatives markets evolve, your traders must adapt to new mandated trading workflows and use swap execution facilities if they are to execute effective trading strategies. With our swap execution facility, SwapEx&reg;, you can transform how you approach trading interest rate swaps and FX derivatives.</p>\r\n\r\n<p>Using a single, multi-product execution platform, SwapEx supports virtually all of your trading needs &mdash; from traditional request for quote (RFQ) to order book, covering unwinds, basket compression and relative value trading strategies. And the platform incorporates forward-looking matching protocols, like indications of interest.</p>\r\n\r\n<p>SwapEx delivers the tools you need, to help you evolve your swap execution approach &mdash; beyond the basic RFQ screens of today. &nbsp; &nbsp; &nbsp;&nbsp;</p>\r\n\r\n<p>Government Bond Execution</p>\r\n\r\n<p>GovEx&reg; is a high-speed, exchange-style trading platform for government bond securities. It delivers the anonymity and forward-thinking technology you need for the US Treasury markets.</p>\r\n\r\n<p>With GovEx, you&rsquo;ll find credit risk management solutions for government bond trading, including prime brokerage workflow support and dynamic credit line management. Based on your needs, it can be integrated with your execution management and order management systems for efficient trading. This solution supports various order types and lets you connect easily through FIX standard interfaces.</p>\r\n",
                comments: [{
                    time: new Date().toLocaleString(),
                    content: "What a good ideal!",
                    name:new_user1.name
                },{
                    time: new Date().toLocaleString(),
                    content: "Sounds great but still a loooot of works to do!!",
                    name:new_user2.name
                }],
                funders: [],
                image: '/images/projects/trading workflow tool.jpeg',
                createTime: new Date(),
                deadline: new Date(2017,1,10,12,0,0),
                targetAmount: 100000,
                raisedAmount: 0
            });
            var proj3 = new Project({
                title: "Data-as-a-Service Platform",
                brief: "Our hosted “Data-as-a-Service” platform, DataGX(SM), lets you load, enrich and aggregate investment data. You’ll be able to manage multi-asset class data from any service provider or data vendor for a more holistic and integrated view of your holdings. This platform reflects our years of experience servicing complex instruments for our global client base and our investments in building advanced data management technologie.",
                description: "<p><br />\r\nThis project provides you with<br />\r\nA holistic, integrated view of holdings for near real-time analysis and reporting.<br />\r\nSupport for both client and reference data from State Street or third-party data sources.<br />\r\nData availability, quality, usability and delivery management.<br />\r\nBuilt-in regulatory audit and data lineage.&nbsp;</p>\r\n\r\n<p>Data Aggregation<br />\r\nStructured data aggregation gives you tools and services to help transform and distribute your data (self-serviced or fully serviced). You&rsquo;ll have a single location for aggregation and redistribution of core client, reference and vendor data for analytics, reporting and investment strategy.&nbsp;<br />\r\nOur hosted data refinery solution aggregates<br />\r\nPortfolio data from multiple sources<br />\r\nMarket/reference data from multiple sources<br />\r\nClient data from internal sources</p>\r\n\r\n<p><br />\r\nData Governance<br />\r\nThe foundational components of our data governance &mdash; strategy, people, process, data and technology &mdash; are integrated within a conceptual governance framework.</p>\r\n\r\n<p>Our approach</p>\r\n\r\n<p>Helps users understand what data they have available at their fingertips so they can use it effectively and efficiently<br />\r\nFollows good metadata management principles for categorizing, describing and controlling the data<br />\r\nKeeps all metadata accessible in business-friendly terms and in line with the data model in real time, while maintaining important IT information<br />\r\nMaintains a strong focus on data stewardship and data quality<br />\r\nIncorporates ontologies<br />\r\nUses modern technology to comply with regulatory requirements</p>\r\n\r\n<p>Data Security<br />\r\nAs a global financial institution, our infrastructure is under strict scrutiny by regulators to protect our clients&rsquo; assets. By hosting our own solution, we maintain the privacy and security of your data, while helping you take advantage of the robust investments we&rsquo;ve made. Our hosted solution and world-class infrastructure shifts the concern away from &ldquo;Where is the data sitting?&rdquo; to &ldquo;Where will it be most secure in a cost-effective manner?&rdquo;</p>\r\n\r\n<p>Following industry-recognized 27001/27002 controls, our comprehensive Corporate Information Security program keeps our employees, partners and clients confident that the information they exchange stays secure. Roles can be set up based on user type and responsibilities and are customizable based on need. In addition, there are full audit trails that track system updates with user information.</p>\r\n\r\n<p>Data Quality<br />\r\nYou&rsquo;re facing complex investment strategies, demanding regulatory requirements and the need to integrate external systems with your in-house capabilities. Through integration with our suite of risk, analytics, and research and advisory capabilities, we offer a holistic solution. From bitemporal storage of all data elements (as-of and as-at) to near real-time data integration, to integrated data governance and data quality controls, we&rsquo;ll help you make sense of your data and put it to work.</p>\r\n\r\n<p>Here&rsquo;s how our solution can help</p>\r\n\r\n<p>Ensure that information meets your expectations and is as detailed as you require<br />\r\nReceive inputs/uploads information accurately<br />\r\nPerform front-end data checks and kick-backs to sender upon failure in receipt of files<br />\r\nValidate information using defined business rules based on industry standards<br />\r\nMonitor for discrepancies to assure information quality for internal usage and for exchange with external systems</p>\r\n",
                comments: [{
                    time: new Date().toLocaleString(),
                    content: "What a good ideal!",
                    name:new_user5.name
                },{
                    time: new Date().toLocaleString(),
                    content: "Sounds great but still a loooot of works to do!!",
                    name:new_user6.name
                },{
                    time: new Date().toLocaleString(),
                    content: "I will fund",
                    name:new_user1.name
                }],
                funders: [],
                image: '/images/projects/DataService.jpg',
                createTime: new Date(),
                deadline: new Date(2016,9,10,12,0,0),
                targetAmount: 100000,
                raisedAmount: 0
            });
            proj1.save();
            proj2.save();
            proj3.save();
        }
    });

};


module.exports.demoData = demoData;