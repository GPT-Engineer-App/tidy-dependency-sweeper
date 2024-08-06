import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, RefreshCw, CheckCircle, Loader2, RotateCw, FileCode2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const Index = () => {
  const [projectPath, setProjectPath] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRebuilding, setIsRebuilding] = useState(false);
  const [rebuildOptions, setRebuildOptions] = useState({
    useTypeScript: false,
    addEslint: true,
    addPrettier: true,
    addTestingLibrary: false,
  });

  const analyzeProject = () => {
    setIsAnalyzing(true);
    // Simulating project analysis
    setTimeout(() => {
      setAnalysisResult({
        unusedDependencies: ['lodash', 'moment'],
        outdatedDependencies: ['react', 'react-dom'],
        missingDependencies: ['axios'],
        securityVulnerabilities: ['node-forge@0.10.0'],
      });
      setIsAnalyzing(false);
      toast.success("Project analysis completed");
    }, 2000);
  };

  const executeDependencyAction = (action, dependency) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `${action}ing ${dependency}...`,
        success: `${dependency} ${action}ed successfully`,
        error: `Failed to ${action.toLowerCase()} ${dependency}`,
      }
    );
  };

  const rebuildProject = () => {
    setIsRebuilding(true);
    // Simulating project rebuild
    setTimeout(() => {
      setIsRebuilding(false);
      toast.success("Project rebuilt successfully");
      // Reset analysis result after rebuild
      setAnalysisResult(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Web Application Dependency Manager</CardTitle>
          <CardDescription>Analyze, clean up, and rebuild your web application dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analyze">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analyze">Analyze & Clean</TabsTrigger>
              <TabsTrigger value="rebuild">Rebuild Project</TabsTrigger>
            </TabsList>
            <TabsContent value="analyze">
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
                    <DependencyList
                      title="Security Vulnerabilities"
                      items={analysisResult.securityVulnerabilities}
                      icon={<AlertTriangle className="h-4 w-4" />}
                      action="Fix"
                      onAction={executeDependencyAction}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="rebuild">
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Caution</AlertTitle>
                  <AlertDescription>
                    Rebuilding your project will create a new configuration. Make sure to back up your current project before proceeding.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="use-typescript"
                      checked={rebuildOptions.useTypeScript}
                      onCheckedChange={(checked) => setRebuildOptions(prev => ({ ...prev, useTypeScript: checked }))}
                    />
                    <Label htmlFor="use-typescript">Use TypeScript</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="add-eslint"
                      checked={rebuildOptions.addEslint}
                      onCheckedChange={(checked) => setRebuildOptions(prev => ({ ...prev, addEslint: checked }))}
                    />
                    <Label htmlFor="add-eslint">Add ESLint</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="add-prettier"
                      checked={rebuildOptions.addPrettier}
                      onCheckedChange={(checked) => setRebuildOptions(prev => ({ ...prev, addPrettier: checked }))}
                    />
                    <Label htmlFor="add-prettier">Add Prettier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="add-testing-library"
                      checked={rebuildOptions.addTestingLibrary}
                      onCheckedChange={(checked) => setRebuildOptions(prev => ({ ...prev, addTestingLibrary: checked }))}
                    />
                    <Label htmlFor="add-testing-library">Add Testing Library</Label>
                  </div>
                </div>
                <Button onClick={rebuildProject} disabled={isRebuilding}>
                  {isRebuilding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Rebuilding...
                    </>
                  ) : (
                    <>
                      <RotateCw className="mr-2 h-4 w-4" />
                      Rebuild Project
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">
            Ensure to backup your project before making any changes.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileCode2 className="mr-2 h-4 w-4" />
                View Config
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Project Configuration</DialogTitle>
                <DialogDescription>
                  Current configuration for your project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <pre className="bg-gray-100 p-2 rounded-md text-sm">
                  {JSON.stringify(rebuildOptions, null, 2)}
                </pre>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
