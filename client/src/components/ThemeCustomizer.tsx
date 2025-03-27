import { useState } from "react";
import { Settings, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/themeContext";

const ThemeCustomizer: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCustomizer = () => {
    setIsOpen(!isOpen);
  };

  const colors = [
    { name: "blue", value: "#3B82F6", class: "bg-blue-500" },
    { name: "green", value: "#10B981", class: "bg-green-500" },
    { name: "purple", value: "#8B5CF6", class: "bg-purple-500" },
    { name: "red", value: "#EF4444", class: "bg-red-500" },
    { name: "yellow", value: "#F59E0B", class: "bg-yellow-500" }
  ];

  const handleColorChange = (color: string) => {
    updateTheme({ primaryColor: color });
  };

  const handleFontChange = (font: string) => {
    updateTheme({ fontFamily: font });
  };

  const handleFontSizeChange = (value: number[]) => {
    updateTheme({ fontSize: value[0] });
  };

  const handleLayoutChange = (layout: string) => {
    updateTheme({ layout });
  };

  const handleThemeModeChange = (mode: string) => {
    updateTheme({ mode });
  };

  const applyChanges = () => {
    // In a real app, this would save settings to backend
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Customizer Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-800 focus:outline-none"
          onClick={toggleCustomizer}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Theme Customizer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Customize Theme</h3>
            <button 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Color Scheme */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Color Scheme</h4>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button 
                    key={color.name}
                    className={`h-8 w-8 rounded-full ${color.class} ${theme.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    onClick={() => handleColorChange(color.value)}
                  />
                ))}
              </div>
            </div>
            
            {/* Font Family */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Font Family</h4>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={theme.fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
              >
                <option value="inter">Inter (Default)</option>
                <option value="roboto">Roboto</option>
                <option value="opensans">Open Sans</option>
                <option value="lato">Lato</option>
              </select>
            </div>
            
            {/* Font Size */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Font Size</h4>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Smaller</span>
                <Slider 
                  defaultValue={[theme.fontSize]} 
                  max={4} 
                  step={1} 
                  className="mx-3"
                  onValueChange={handleFontSizeChange}
                />
                <span className="text-sm text-gray-600">Larger</span>
              </div>
            </div>
            
            {/* Layout Options */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Layout</h4>
              <RadioGroup 
                defaultValue={theme.layout}
                onValueChange={handleLayoutChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="layout-standard" />
                  <Label htmlFor="layout-standard">Standard</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sidebar-right" id="layout-sidebar-right" />
                  <Label htmlFor="layout-sidebar-right">Sidebar Right</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sidebar-left" id="layout-sidebar-left" />
                  <Label htmlFor="layout-sidebar-left">Sidebar Left</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-width" id="layout-full-width" />
                  <Label htmlFor="layout-full-width">Full Width</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Theme Mode */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Theme Mode</h4>
              <div className="flex space-x-2">
                <Button 
                  variant={theme.mode === 'light' ? 'default' : 'outline'}
                  className="flex-1" 
                  onClick={() => handleThemeModeChange('light')}
                >
                  Light
                </Button>
                <Button 
                  variant={theme.mode === 'dark' ? 'default' : 'outline'}
                  className="flex-1 bg-gray-800 border-gray-800"
                  onClick={() => handleThemeModeChange('dark')}
                >
                  Dark
                </Button>
                <Button 
                  variant={theme.mode === 'auto' ? 'default' : 'outline'}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 border-transparent"
                  onClick={() => handleThemeModeChange('auto')}
                >
                  Auto
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full"
              onClick={applyChanges}
            >
              Apply Changes
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={resetTheme}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeCustomizer;
