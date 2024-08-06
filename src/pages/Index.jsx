import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, RefreshCw, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

const Index = () => {
  const [projectPath, setProjectPath] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeProject = () => {
    setIsAnalyzing(true);
    // Simulating project analysis
    setTimeout(() => {
      setAnalysisResult({
        unusedDependencies: ['lodash', 'moment'],
        outdatedDependencies: ['react', 'react-dom'],
        missingDependencies: ['axios'],
      });
      setIsAnalyzing(false);
      toast.success("Project analysis completed");
    }, 2000);
  };

  const executeDependencyAction = (action, dependency) => {
    // Simulating dependency action
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `${action}ing ${dependency}...`,
        success: `${dependency} ${action}ed successfully`,
        error: `Failed to ${action.toLowerCase()} ${dependency}`,
      }
    );
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
              <Button onClick={analyzeProject} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
            {analysisResult && (
              <div className="space-y-4">
                <DependencyList
                  title="Unused Dependencies"
                  items={analysisResult.unusedDependencies}
                  icon={<Trash2 className="h-4 w-4" />}
                  action="Remove"
                  onAction={executeDependencyAction}
                />
                <DependencyList
                  title="Outdated Dependencies"
                  items={analysisResult.outdatedDependencies}
                  icon={<RefreshCw className="h-4 w-4" />}
                  action="Update"
                  onAction={executeDependencyAction}
                />
                <DependencyList
                  title="Missing Dependencies"
                  items={analysisResult.missingDependencies}
                  icon={<CheckCircle className="h-4 w-4" />}
                  action="Install"
                  onAction={executeDependencyAction}
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

const DependencyList = ({ title, items, icon, action, onAction }) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
          <span>{item}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction(action, item)}
          >
            {icon}
            <span className="ml-2">{action}</span>
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

export default Index;
