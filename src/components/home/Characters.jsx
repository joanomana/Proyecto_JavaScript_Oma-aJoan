import { useEffect, useState } from "react";

export default function Rules() {
    const [rules, setRules] = useState([]);
    const [expandedRule, setExpandedRule] = useState(null);
    const [ruleDetails, setRuleDetails] = useState({});
    const [subsectionDetails, setSubsectionDetails] = useState({});

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await fetch("https://www.dnd5eapi.co/api/2014/rules");
                const data = await response.json();
                setRules(data.results);
            } catch (error) {
                console.error("Error fetching rules:", error);
            }
        };
        fetchRules();
    }, []);

    const fetchRuleDetail = async (rule) => {
        if (!ruleDetails[rule.index]) {
            try {
                const response = await fetch(`https://www.dnd5eapi.co${rule.url}`);
                const data = await response.json();
                setRuleDetails((prev) => ({ ...prev, [rule.index]: data }));
            } catch (error) {
                console.error(`Error fetching details for ${rule.name}:`, error);
            }
        }
        setExpandedRule(expandedRule === rule.index ? null : rule.index);
    };

    const toggleSubsectionDetail = async (subsection) => {
        if (subsectionDetails[subsection.index]) {

            setSubsectionDetails((prev) => {
                const newDetails = { ...prev };
                delete newDetails[subsection.index];
                return newDetails;
            });
        } else {

            try {
                const response = await fetch(`https://www.dnd5eapi.co${subsection.url}`);
                const data = await response.json();
                setSubsectionDetails((prev) => ({ ...prev, [subsection.index]: data }));
            } catch (error) {
                console.error(`Error fetching subsection ${subsection.name}:`, error);
            }
        }
    };

    return (
        <div className="py-12 px-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">D&D Game Rules</h1>
                <p className="text-gray-700">Explore the core rules that shape your adventures</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {rules.map((rule) => (
                    <div key={rule.index} className="bg-white rounded-xl shadow-lg transition hover:shadow-xl">
                        <button
                            onClick={() => fetchRuleDetail(rule)}
                            className="w-full text-left px-6 py-4 flex justify-between items-center text-xl font-semibold text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            {rule.name}
                            <span className="ml-2 transform transition-transform duration-300">
                                {expandedRule === rule.index ? "▲" : "▼"}
                            </span>
                        </button>
                        {expandedRule === rule.index && ruleDetails[rule.index] && (
                            <div className="px-6 pb-6 text-gray-800">
                                <p className="text-base mb-4">
                                    {Array.isArray(ruleDetails[rule.index].desc)
                                        ? ruleDetails[rule.index].desc.join(" ")
                                        : ruleDetails[rule.index].desc || "No description available."}
                                </p>
                                {ruleDetails[rule.index].subsections?.length > 0 && (
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Subsections:</h2>
                                        <div className="space-y-2">
                                            {ruleDetails[rule.index].subsections.map((subsection) => (
                                                <div key={subsection.index} className="border border-gray-200 rounded-md p-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-indigo-600 font-medium">{subsection.name}</span>
                                                        <button
                                                            onClick={() => toggleSubsectionDetail(subsection)}
                                                            className="text-sm text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded"
                                                        >
                                                            {subsectionDetails[subsection.index] ? "Hide Details" : "More Info"}
                                                        </button>
                                                    </div>
                                                    {subsectionDetails[subsection.index] && (
                                                        <div className="mt-2 text-gray-700">
                                                            <p>
                                                                {Array.isArray(subsectionDetails[subsection.index].desc)
                                                                    ? subsectionDetails[subsection.index].desc.join(" ")
                                                                    : subsectionDetails[subsection.index].desc || "No description available."}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
