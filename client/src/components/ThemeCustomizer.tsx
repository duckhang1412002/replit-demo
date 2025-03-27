import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ThemeCustomizer: React.FC = () => {
  const { 
    isCustomizerOpen, 
    toggleCustomizer, 
    colorSchemes, 
    fontOptions, 
    themeSettings,
    updateColorScheme,
    updateFont,
    updateLayout
  } = useTheme();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <Card className="h-full w-80 rounded-none overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">Customize Theme</CardTitle>
            <CardDescription>
              Personalize your blog's appearance
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCustomizer}
            aria-label="Close customizer"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Color Scheme
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  className={`h-8 w-8 rounded-full focus:outline-none transition-all ${
                    themeSettings.colorScheme.id === scheme.id 
                      ? 'ring-2 ring-ring ring-offset-2' 
                      : 'ring-0'
                  }`}
                  style={{ backgroundColor: scheme.primary }}
                  onClick={() => updateColorScheme(scheme.id)}
                  aria-label={`Color scheme ${scheme.id}`}
                />
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Font Style
            </h4>
            <div className="space-y-2">
              {fontOptions.map((font) => (
                <Button
                  key={font.id}
                  variant="outline"
                  className={`w-full justify-start h-auto py-2 px-3 ${
                    themeSettings.font.id === font.id
                      ? 'bg-primary/10 border-primary/20'
                      : ''
                  }`}
                  onClick={() => updateFont(font.id)}
                >
                  <div className="text-left">
                    <p className="text-sm font-medium">{font.name}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Layout
            </h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-2 px-3 ${
                  themeSettings.layout === 'sidebar-right'
                    ? 'bg-primary/10 border-primary/20'
                    : ''
                }`}
                onClick={() => updateLayout('sidebar-right')}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Sidebar Right (Default)</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-2 px-3 ${
                  themeSettings.layout === 'sidebar-left'
                    ? 'bg-primary/10 border-primary/20'
                    : ''
                }`}
                onClick={() => updateLayout('sidebar-left')}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Sidebar Left</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className={`w-full justify-start h-auto py-2 px-3 ${
                  themeSettings.layout === 'full-width'
                    ? 'bg-primary/10 border-primary/20'
                    : ''
                }`}
                onClick={() => updateLayout('full-width')}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">Full Width</p>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeCustomizer;
