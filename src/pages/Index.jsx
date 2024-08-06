import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, RefreshCw, CheckCircle } from "lucide-react"

const Index = () => {
  const [projectPath, setProjectPath] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeProject = () => {
    // Simulating project analysis
    setAnalysisResult({
      unusedDependencies: ['lodash', 'moment'],
      outdatedDependencies: ['react', 'react-dom'],
      missingDependencies: ['axios'],
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Web Application Dependency Cleaner</CardTitle>
          <CardDescription>Analyze and clean up your web application dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter project path"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
              />
              <Button onClick={analyzeProject}>Analyze</Button>
            </div>
            {analysisResult && (
              <div className="space-y-4">
                <DependencyList
                  title="Unused Dependencies"
                  items={analysisResult.unusedDependencies}
                  icon={<Trash2 className="h-4 w-4" />}
                  action="Remove"
                />
                <DependencyList
                  title="Outdated Dependencies"
                  items={analysisResult.outdatedDependencies}
                  icon={<RefreshCw className="h-4 w-4" />}
                  action="Update"
                />
                <DependencyList
                  title="Missing Dependencies"
                  items={analysisResult.missingDependencies}
                  icon={<CheckCircle className="h-4 w-4" />}
                  action="Install"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Ensure to backup your project before making any changes.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

const DependencyList = ({ title, items, icon, action }) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
          <span>{item}</span>
          <Button variant="outline" size="sm">
            {icon}
            <span className="ml-2">{action}</span>
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

export default Index;
