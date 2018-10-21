module.exports = function (plop) {
    plop.setGenerator('view', {
        description: 'Create New Page',
        prompts: [
            {
                name: 'name',
                message: 'Page Name'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/{{camelCase name}}.html',
                templateFile: 'plop-templates/view/template.html'
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/index.js',
                templateFile: 'plop-templates/view/index.js'
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/style.scss',
                templateFile: 'plop-templates/view/style.scss'
            }
        ]
    })

	plop.setGenerator('component', {
		description: 'Create New Component',
		prompts: [
			{
				name: 'name',
				message: 'Component Name'
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
				templateFile: 'plop-templates/component/Component.js'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/index.js',
				templateFile: 'plop-templates/component/index.js'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/style.scss',
				templateFile: 'plop-templates/component/style.scss'
			}
		]
	})
}
